from openbot.server.app import App
from openbot.server.app_database import SQLAlchemy
from openbot.server.app_ui import UI
from openbot.server.app_api import API
from openbot.server.app_auth import Auth
from openbot.server.app_plugin_registry import PluginRegistry
from flask_bcrypt import Bcrypt

app = App()
api = API()
db = SQLAlchemy()
ui = UI()
bcrypt = Bcrypt()
auth = Auth()
plugin_registry = PluginRegistry()


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

    global auth
    auth.init_app(app)

    global plugin_registry
    plugin_registry.init_app(app)

    return app




