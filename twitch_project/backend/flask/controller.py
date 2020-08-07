from flask import Flask, jsonify, request
from flask_cors import CORS
from models import Users, Performers

app = Flask(__name__)
CORS(app)

@app.route("/login", methods=["POST"]
def login():
    data = request.get_json()
    # authenticate our account
    token = Users.login(data.get("email"), data.get("password"))
    # if the account exists, return auth token
    if token:
        # return (json with id to log in here)
        return {"token": token}
    # return (json that tells React we are not successful)
    return {"token": ""}

@app.route("/create_account", methods=["POST"]
def create_account():
    data = request.get_json()
    exists = Users.email_exists(data.get("email"))
    if not exists:
        new_user = Users(data.get("email"), data.get("twitch_un"), data.get("password"))
        new_user._insert()
        return ("create": "successful")
    return ("create": "")
    
@app.route("/logout", methods=["POST"]
def logout():
    User.logout()

@app.route("/get_my_performers", methods=["POST"]
def get_my_performers():
    # this will need to get token from session and match to twitch_id
    token = request.json().get("token")
    user_id = Users.authenticate(token)
    performers = User.my_performers(user_id)
    # return all those performers to React
    return performers

@app.route("/synch_twitch_performers", methods=["POST"]
def synch_performers():
    # get user_id/token from session
    token = request.json().get("token")
    user_id = Users.authenticate(token)
    # make call to twitch for this user
    Users.performers_by_music(user_id)
    # return all user follows from DB
    performers = User.my_performers(user_id)
    return performers

@app.route("/schedule_sets", methods=["POST"]
def schedule():
    # authenticate user
    # get schedule info from react
    # lookup performers to add
    # send back the data to React