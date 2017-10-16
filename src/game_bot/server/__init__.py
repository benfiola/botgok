from game_bot.server.app import App
from game_bot.server.database import SQLAlchemy
from game_bot.server.ui import UI
from game_bot.server.api import API
from flask_bcrypt import Bcrypt
from flask_jwt import JWT
import json

app = App()
api = API()
db = SQLAlchemy()
ui = UI()
bcrypt = Bcrypt()
jwt = JWT()


def create_app(json_config_file):
    global app
    app.config.from_json(json_config_file)

    global bcrypt
    bcrypt.init_app(app)

    global db
    db.init_app(app)

    global api
    api.init_app(app)

    global ui
    ui.init_app(app)

    global jwt
    jwt.init_app(app)

    return app

