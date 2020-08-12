from flask import Flask, jsonify, request
from flask_cors import CORS
from models import Users, Performers

app = Flask(__name__)
CORS(app)

@app.route("/api/login", methods=["POST"]
def login():
    data = request.get_json()
    # authenticate our account
    token = Users.login(data.get("email"), data.get("password"))
    # if the account exists, return auth token
    if token:
        # return (json with id to log in here)
        return jsonify({"token": token})
    # return (json that tells React we are not successful)
    return json({"token": ""})

@app.route("/api/create_account", methods=["POST"]
def create_account():
    data = request.get_json()
    exists = Users.email_exists(data.get("email"))
    if not exists:
        new_user = Users(data.get("email"), data.get("twitch_un"), data.get("password"))
        new_user._insert()
        return jsonify({"create": "successful"})
    return jsonify({"create": ""})
    
@app.route("/api/logout", methods=["POST"]
def logout():
    token = request.json().get("token")
    user_id = Users.authenticate(token)
    user = Users(user_info[0], user_info[1], user_info[2])
    User.logout()
    return jsonify({"logout": "successful"})


@app.route("/api/get_my_performers", methods=["POST"]
def get_my_performers():
    # this will need to get token from session and match to twitch_id
    token = request.json().get("token")
    user_info = Users.authenticate(token)
    user = Users(user_info[0], user_info[1], user_info[2])
    performers = User.my_performers(user_info[3])
    # return all those performers to React
    return jsonify(performers)

@app.route("/api/synch_twitch_performers", methods=["POST"]
def synch_performers():
    # get user_id/token from session
    token = request.json().get("token")
    user_id = Users.authenticate(token)
    user = Users(user_info[0], user_info[1], user_info[2])
    # make call to twitch for this user
    Users.performers_by_music(user_info[2])
    # return all user follows from DB
    performers = User.my_performers(user_info[2])
    return jsonify(performers)

@app.route("/api/schedule_sets", methods=["POST"]
def schedule():
    # authenticate user
    token = request.json().get("token")
    user_id = Users.authenticate(token)
    user = Users(user_info[0], user_info[1], user_info[2])
    # get schedule info from react
    # lookup performers to add
    # send back the data to React