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

    with db as session:
        if user_id is None:
            data = [user.to_json() for user in session.query(User).all()]
            return jsonify(result=data, status=200)

        else:
            user = session.query(User).filter(User.id == user_id).one_or_none()
            if user is None:
                return Response("User with id {} does not exist".format(user_id), status=400)
            return jsonify(result=user.to_json(), status=200)


@app.route('/api/v1/user/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    if current_identity.id != user_id and not current_identity.admin:
        return Response(status=401)

    with db as session:
        user = session.query(User).filter(User.id == user_id).one_or_none()

        if user is None:
            return Response("User with id {} does not exist".format(user_id))

        session.delete(user)
    return Response(status=204)


@app.route('/api/v1/user', methods=['POST'])
@jwt_required()
def add_user():
    data = request.json

    with db as session:
        new_user = User(**data)
        session.add(new_user)

    return Response(status=201, headers={
        "Location": "/api/v1/user/{}".format(new_user.id)
    })

