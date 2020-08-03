from flask.controller import app
from models import ORM

ORM.dbpath = "data/twitchapp.db"

app.run()
