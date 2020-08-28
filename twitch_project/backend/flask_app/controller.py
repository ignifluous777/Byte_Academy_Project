from flask import Flask, jsonify, request
import string, random
from flask_cors import CORS
from models.users import Users
from models.performers import Performers
from models.scheduler import Schedule
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

@app.route("/api/schedule", methods=["POST"])
def schedule():
    data = request.get_json()
    token = data.get("token")
    user_info = Users.authenticate(token)
    user = Users(user_info[0][1], user_info[0][2], user_info[0][4], twitch_id=user_info[0][3])
    # get schedule info from react the "data" coming in will need to have a lot of info 
    # i.e. date, a time slots array, a performers array, user_id will come from the auth here in the route,
    # and the unique sked_id generated here:
    sk_id = sked_id_gen()
    # print(sk_id)
    time_slots = data.get("timeSlots")
    # print(time_slots)
    performers = data.get("performers")
    # print(performers)
    print(user_info[0][3], data.get("date"), time_slots[0], performers[0])
    for i in range(len(time_slots)):
        sked = Schedule(user_info[0][3], data.get("date"), time_slots[i], performers[i], sked_id=sk_id)
        sked._insert()
    return jsonify({"create": "successful", "sk_id": sk_id})

# sked_id key generator helper function:

def sked_id_gen():
    letters = string.ascii_letters
    sk_id = ''.join(random.choice(letters) for i in range(16))
    return sk_id

    
@app.route("/api/showsked", methods=["POST"])
def showsked():
    data = request.get_json()
    sk_id = data.get("sk_id")
    schedule = Schedule.get_sked_by_id(sk_id)
    print(schedule)
    if schedule != []:
        return jsonify(schedule)
    else:
        return jsonify("")

# @app.route("/api/showsked/<sk_id>", methods=["POST"])
# def showsked():
#     # data = request.get_json()
#     sk_id = data.get("sk_id")
#     schedule = Schedule.get_sked_by_id(sk_id)
#     return jsonify(schedule)