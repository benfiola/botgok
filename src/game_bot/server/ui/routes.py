from game_bot.server import app
from flask_jwt import jwt_required, current_identity
from flask import render_template, redirect


@app.route("/<path:whole_path>", methods=['GET'])
@jwt_required()
def template_route(whole_path):
    return render_template(whole_path)