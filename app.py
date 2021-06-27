import json

from flask import Flask, redirect, url_for, session, request, render_template
from authlib.integrations.flask_client import OAuth
import os
import keys
from datetime import timedelta

from auth_decorator import login_required
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_statistics import Statistics
from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey
from sqlalchemy import inspect
import time
import models
import json

# App config
app = Flask(__name__, static_folder='./client/build', static_url_path='/')

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MODE = "PROD"  # Set to PROD or DEV
engine = create_engine('sqlite:///database.db')
with engine.connect() as con:
    con.execute("""CREATE TABLE IF NOT EXISTS `request` (
	`index`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`response_time`	FLOAT,
	`date`	DateTime,
	`method`	String,
	`size`	INTEGER,
	`status_code`	INTEGER,
	`path`	TEXT,
	`user_agent`	TEXT,
	`remote_address`	TEXT,
	`exception`	TEXT,
	`referrer`	TEXT,
	`browser`	TEXT,
	`platform`	TEXT,
	`mimetype`	TEXT
);""")
db = SQLAlchemy(app)


class Request(db.Model):
    __tablename__ = "request"

    index = db.Column(db.Integer, primary_key=True, autoincrement=True)
    response_time = db.Column(db.Float)
    date = db.Column(db.DateTime)
    method = db.Column(db.String)
    size = db.Column(db.Integer)
    status_code = db.Column(db.Integer)
    path = db.Column(db.String)
    user_agent = db.Column(db.String)
    remote_address = db.Column(db.String)
    exception = db.Column(db.String)
    referrer = db.Column(db.String)
    browser = db.Column(db.String)
    platform = db.Column(db.String)
    mimetype = db.Column(db.String)


statistics = Statistics(app, db, Request)

# Session config
app.secret_key = "eeeeeeeeeeeeeeeeeeeeeeee"
app.config['SESSION_COOKIE_NAME'] = 'google-login-session'
# app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)

# oAuth Setup
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id=keys.cid,
    client_secret=keys.csecret,
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
    # This is only needed if using openId to fetch user info
    client_kwargs={'scope': 'openid email profile'},
)


@app.route('/api/isUser', methods=["GET"])
@login_required
def hello_world():
    return dict(session)['profile']


@app.route('/api/login', methods=["GET"])
def login():
    google = oauth.create_client('google')  # create the google oauth client
    redirect_uri = url_for('authorize', _external=True)
    return google.authorize_redirect(redirect_uri)


@app.route('/api/authorize')
def authorize():
    google = oauth.create_client('google')  # create the google oauth client
    token = google.authorize_access_token()  # Access token from google (needed to get user info)
    resp = google.get('userinfo')  # userinfo contains stuff u specificed in the scrope
    user_info = resp.json()
    user = oauth.google.userinfo()  # uses openid endpoint to fetch user info
    # Here you use the profile/user data that you got and query your database find/register the user
    # and set ur own data in the session not the profile from google

    print(user_info)
    session['profile'] = user_info
    session.permanent = True  # make the session permanant so it keeps existing after broweser gets closed
    if MODE == "DEV":
        return redirect('http://localhost:3000/')

    models.insertIfDoesntExist(user_info)
    return redirect('/')


@app.route('/api/logout')
def logout():
    for key in list(session.keys()):
        session.pop(key)
    if MODE == "DEV":
        return redirect('http://localhost:3000/')
    return redirect('/')


@app.route('/api/chronicles', methods=["GET"])
@login_required
def send_chronicles():
    return models.chronicles


@app.route('/api/stationDetails', methods=["GET"])
@login_required
def send_stationDetails():
    return models.details


@app.route('/api/stationDetailsPS1', methods=["GET"])
@login_required
def send_stationDetails_PS1():
    return models.detailsps1


@app.route('/api/problembank', methods=["GET"])
@login_required
def send_bank():
    return models.bank

@app.route('/api/formStationNames', methods=["GET"])
@login_required
def send_names():
    return models.find_names()

@app.route('/api/formResponses', methods=["GET"])
@login_required
def send_form_responses():
    return models.form_responses()

@app.route('/api/formResponsesDetailed', methods=["GET"])
@login_required
def send_form_detailed_responses():
    return models.form_detailed_responses()

@app.route('/api/formSubmit', methods=["POST"])
@login_required
def form_submit():
    data = request.get_json()
    models.form_submit(data)
    return "Cool"
    


@app.route('/api/noOfUsers', methods=["GET"])
# @login_required
def noOfUsers():
    return json.dumps(models.users.count_documents({}))


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


if __name__ == "__main__":
    s = os.popen("python3 models.py")

    app.debug = True
    app.run(host="0.0.0.0")
