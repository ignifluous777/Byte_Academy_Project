from flask import Flask, jsonify, request
from flask_cors import CORS

from models import Users

app = Flask(__name__)
CORS(app)
