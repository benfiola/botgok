from game_bot.server import app, db
from flask_jwt import jwt_required, current_identity
from flask import request, Response, jsonify
from game_bot.server.database.models import User


@app.route('/api/v1/user', methods=['GET'])
@app.route('/api/v1/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id=None):
    if user_id is None and not current_identity.admin:
        return Response(status=401)
    if user_id is not None and (current_identity.id != user_id and not current_identity.admin):
        return Response(status=401)
    pass


@app.route('/api/v1/user', methods=['POST'])
def add_user():
    data = request.json

    with db as session:
        new_user = User(**data)
        session.add(new_user)

    return Response(status=201, headers={
        "Location": "/api/v1/user/{}".format(new_user.id)
    })

