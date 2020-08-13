from flask_app.controller import app
from models import orm

orm.dbpath = "data/twitchapp.db"

# app.run()

if __name__ == "__main__":
    app.run(debug=True)