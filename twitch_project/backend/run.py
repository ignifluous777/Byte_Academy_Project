from flask_app.controller import app
from models import orm

orm.dbpath = "data/twitchapp.db"

app.run()
