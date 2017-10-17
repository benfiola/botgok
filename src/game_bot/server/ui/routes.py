from game_bot.server import app
from flask import render_template


@app.route("/<path:whole_path>", methods=['GET'])
def template_route(whole_path):
    if not whole_path:
        whole_path = "index.html"
    return render_template(whole_path)