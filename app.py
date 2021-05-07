from flask import Flask, redirect, url_for, session
from authlib.integrations.flask_client import OAuth
import os
from Globals import *
from datetime import timedelta
# decorator for routes that should be accessible only by logged in users
from auth_decorator import login_required
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_statistics import Statistics
import threading
from scaperOperations import *
import time

# App config
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"

db = SQLAlchemy(app)

from flask import send_file


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
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)

# oAuth Setup
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id="1053080488870-u4r40p6eqkc30ori7hbmh97gds5dpdfc.apps.googleusercontent.com",
    client_secret="SAe9CnsKCmdqiNJM-AJ2XTte",
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
    # This is only needed if using openId to fetch user info
    client_kwargs={'scope': 'openid email profile'},
)


@app.route('/')
@login_required
def hello_world():
    email = dict(session)['profile']['email']
    return f'Hello, you are logged in as {email}!'


@app.route('/login')
def login():
    google = oauth.create_client('google')  # create the google oauth client
    redirect_uri = url_for('authorize', _external=True)
    return google.authorize_redirect(redirect_uri)


@app.route('/authorize')
def authorize():
    google = oauth.create_client('google')  # create the google oauth client
    token = google.authorize_access_token()  # Access token from google (needed to get user info)
    resp = google.get('userinfo')  # userinfo contains stuff u specificed in the scrope
    user_info = resp.json()
    user = oauth.google.userinfo()  # uses openid endpoint to fetch user info
    # Here you use the profile/user data that you got and query your database find/register the user
    # and set ur own data in the session not the profile from google
    session['profile'] = user_info
    session.permanent = True  # make the session permanant so it keeps existing after broweser gets closed
    return redirect('/')


@app.route('/logout')
def logout():
    for key in list(session.keys()):
        session.pop(key)
    return redirect('/')


@app.route('/csv', methods=["GET"])  # this is a job for GET, not POST
def send_csv():
    print(csvInUse, "yeeeeeeee")
    if csvInUse:
        print("sleeping :)")
        time.sleep(120)
        return "sleeping"
    else:
        print(csvInUse, "yeeeeeeee")

        return send_file('Example.csv', mimetype='text/csv', attachment_filename='Example.csv',
                         as_attachment=True)



if __name__ == "__main__":
    csvInUse = False
    th = threading.Thread(target=runScriptAfterInterval)
    th.start()
    app.debug = True
    app.run()
    th.join()
