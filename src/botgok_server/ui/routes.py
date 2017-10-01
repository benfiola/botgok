from game_bot_server.app import current_app
from flask import render_template


@current_app.route("/")
def index():
    return render_template("index.html")