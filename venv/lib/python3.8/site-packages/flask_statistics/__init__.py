import datetime
import time

from flask import Flask, Response, g, request, render_template, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy import Model
from .utils import StatisticsQueries
from typing import Callable


class Statistics:
    def __init__(
        self,
        app: Flask = None,
        db: SQLAlchemy = None,
        model: Model = None,
        before_f: Callable = None,
        **kwargs
    ):

        if (app is not None and db is not None
                and model is not None):
            self.init_app(app, db, model, before_f, **kwargs)

    def init_app(
        self,
        app: Flask,
        db: SQLAlchemy,
        model: Model,
        before_f: Callable = None,
        **kwargs
    ) -> None:
        """Initalizes extensions."""
        self.app = app
        self.db = db
        self.model = model

        self.api = StatisticsQueries(self.db, self.model)

        # Config variables
        self.date_span = self.app.config.get(
            "STATISTICS_DEFAULT_DATE_SPAN", datetime.timedelta(days=7))


        # Register function that runs before / after each request
        # These functions are used to collect the data
        self.app.before_request(self.before_request)
        self.app.after_request(self.after_request)
        self.app.teardown_request(self.teardown_request)

        # Blueprint
        self.blueprint = Blueprint("statistics", __name__, template_folder="./templates",
                                   url_prefix="/statistics")
        self.blueprint.add_url_rule("/", "index", self.index_view)
        if before_f is not None:
            self.blueprint.before_request(before_f)
        self.app.register_blueprint(self.blueprint)

        if "disable_f" in kwargs:
            self.disable_f = kwargs["disable_f"]

    def index_view(self):
        path = request.args.get("path", None)

        start = request.args.get("start", None)
        end = request.args.get("end", None)

        # Parse passed input
        if start and end is not None:
            start_date = datetime.datetime.strptime(start, "%Y-%m-%d")
            end_date = datetime.datetime.strptime(end, "%Y-%m-%d")

        else:
            # Default show statistics from span set in config until today
            current_date = datetime.datetime.utcnow()

            start_date = current_date - self.date_span
            end_date = current_date

        # To include the whole end day, we have to set the day to 1 ms before midnight
        end_date = end_date.replace(hour=23, minute=59, second=59, microsecond=59)

        # Overview for all routes
        if path is None:
            routes = self.api.get_routes_data(start_date,
                                              end_date)

            user_chart_data = self.api.get_user_chart_data(start_date,
                                                           end_date)

            hits = sum([route.hits for route in routes])
            unique_users = self.api.get_number_of_unique_visitors(start_date,
                                                                 end_date)

            return render_template("flask_statistics_index.html",
                                   routes=routes,
                                   hits=hits,
                                   unique_users=unique_users,
                                   user_chart_data=user_chart_data,
                                   start_date=str(start_date.date()),
                                   end_date=str(end_date.date()))


        # Single stats for a specifc path
        requests = self.api.get_requests_for_path(path,
                                                  start_date,
                                                  end_date)

        user_chart_data = self.api.get_user_chart_data(start_date,
                                                       end_date,
                                                       path)

        return render_template("flask_statistics_single_view.html",
                               path=path,
                               requests=requests,
                               user_chart_data=user_chart_data,
                               start_date=str(start_date.date()),
                               end_date=str(end_date.date()))

    def before_request(
        self
    ) -> None:
        """Function that is called before a request is processed."""

        if self.disable_f():
            return None

        # Take time when request started
        g.start_time = time.time()
        g.request_date = datetime.datetime.utcnow()
        # after_request, which is used to get the status code,
        # is skipped if an error occures, so we set a default
        # error code that is used when this happens
        g.request_status_code = 500

    def after_request(
        self,
        response: Response
    ) -> Response:
        """Function that is called after a request was processed."""

        if self.disable_f():
            return response

        g.request_status_code = response.status_code
        g.request_content_size = response.content_length
        g.mimetype = response.mimetype

        return response

    def teardown_request(
        self,
        exception: Exception = None
    ) -> None:
        """Function that is called after a request, whether it was successful
        or not."""

        try:
            if self.disable_f():
                return None

            # Take time when request ended
            end_time = time.time()

            # Create object that is later stored in database
            obj = {}

            # the time to finish the request
            obj["response_time"] = end_time - g.start_time
            # the returned status code
            obj["status_code"] = g.request_status_code
            # body response size in bytes
            obj["size"] = g.request_content_size
            # used method (PUT, PATCH, GET, POST, ...)
            obj["method"] = request.method
            # ip address
            obj["remote_address"] = request.environ.get("HTTP_X_REAL_IP", request.remote_addr)
            # requested path (e.g. /homepage, /about, ...)
            obj["path"] = request.path
            # page that linked to requested page
            obj["referrer"] = request.referrer
            # browser and version
            obj["browser"] = "{browser} {version}".format(
                browser=request.user_agent.browser,
                version=request.user_agent.version)
            # platform (e.g. windows)
            obj["platform"] = request.user_agent.platform
            # complete user agent string
            obj["user_agent"] = request.user_agent.string
            # date when request was send
            obj["date"] = g.request_date
            # mimetype (e.g. text/html) of the response send to the client
            obj["mimetype"] = g.mimetype
            # exception (if there was one)
            obj["exception"] = None if exception is None else repr(exception)

            """
            # Gets geo data based of ip
            url = "https://freegeoip.app/json/{0}".format(request.remote_addr)
            with requests.get(url) as req:
                if req.status_code != 403:  # 403 means rate limted was reached
                    resp = req.json()

                    none_if_empty = lambda s: None if resp.get(s) == "" else resp.get(s)  # noqa F731

                    obj["country_code"] = none_if_empty("country_code")
                    obj["country_name"] = none_if_empty("country_name")
                    obj["region_code"] = none_if_empty("region_code")
                    obj["region_name"] = none_if_empty("region_name")
                    obj["city"] = none_if_empty("city")
                    obj["zip_code"] = none_if_empty("zip_code")
                    obj["time_zone"] = none_if_empty("time_zone")
            """

            # Adds object to db and saves
            self.db.session.add(
                self.model(**obj)
            )
            self.db.session.commit()
        except Exception as e:
            self.app.logger.warning("Error in flask-statistics teardown: " + str(e))

    def disable_f(self):
        """ Return False if this request should be recorded. Can be overridden by user. """
        return False
