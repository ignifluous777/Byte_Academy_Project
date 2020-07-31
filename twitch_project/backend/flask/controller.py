from flask import Flask, jsonify, request
from flask_cors import CORS

from models import Users

app = Flask(__name__)
CORS(app)

@app.route("/api/create", methods=["POST"])
def create_user():
    # get data from request
    data = request.get_json()
    # TODO: see if account exists
    new_user = Users(data.get("username"), data.get("password"), 
                       key, data.get("balance"))
    new_user.save()
    # save new account account.save()
    return jsonify({"session_id": new_user.api_key, 
                    "username": new_user.username})