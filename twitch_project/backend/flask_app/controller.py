from flask import Flask, jsonify, request
from flask_cors import CORS
from models.users import Users
from models.performers import Performers
from pprint import pprint

app = Flask(__name__)
CORS(app)

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    # authenticate our account
    token = Users.login(data.get("email"), data.get("password"))
    # if the account exists, return auth token
    if token:
        return jsonify({"token": token})
    # return (json that tells React we are not successful)
    return jsonify({"token": ""})

@app.route("/api/create_account", methods=["POST"])
def create_account():
    data = request.get_json()
    exists = Users.email_exists(data.get("email"), data.get("twitch_un"))
    if not exists:
        new_user = Users(data.get("email"), data.get("twitch_un"), data.get("password"))
        new_user._insert()
        return jsonify({"create": "successful"})
    return jsonify({"create": ""})
    
@app.route("/api/logout", methods=["POST"])
def logout():
    data = request.get_json()
    token = data.get("token")
    user_info = Users.authenticate(token)
    user = Users(user_info[0][1], user_info[0][2], user_info[0][4])
    user.logout()
    return jsonify({"logout": "successful"})


@app.route("/api/get_my_performers", methods=["POST"])
def get_my_performers():
    data = request.get_json()
    token = data.get("token")
    user_info = Users.authenticate(token)
    user = Users(user_info[0][1], user_info[0][2], user_info[0][4], twitch_id=user_info[0][3])
    performers = user.my_performers(user_info[0][3])
    # return all those performers to React
    return jsonify(performers)

@app.route("/api/synch_twitch_performers", methods=["POST"])
def synch_performers():
    data = request.get_json()
    token = data.get("token")
    user_info = Users.authenticate(token)
    user = Users(user_info[0][1], user_info[0][2], user_info[0][4], twitch_id=user_info[0][3])
    # make call to twitch for all the artists this user follows
    status = user.performers_by_music(user_info[0][3])
    # return all user follows from DB
    # performers = user.my_performers(user_info[0][3])
    if status:
        return jsonify({"synch": "successful"})
    else:
        return jsonify({"synch": ""})

@app.route("/api/schedule_sets", methods=["POST"])
def schedule():
    # authenticate user
    token = request.json().get("token")
    user_id = Users.authenticate(token)
    user = Users(user_info[0], user_info[1], user_info[2])
    # get schedule info from react
    # lookup performers to add
    # send back the data to React

