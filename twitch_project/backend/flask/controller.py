from flask import Flask, jsonify, request
from flask_cors import CORS

from models import Users

app = Flask(__name__)
CORS(app)

@app.route("/login", methods=["POST"]
def login():
    email = request.json().get("email")
    password = request.json().get("password")
    user = User.login(email, password)
    if user:
        return (json with id to log in here)
    return (json that tells React we are not successful)