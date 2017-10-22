from game_bot.server import jwt, db, bcrypt, app
from flask_jwt import jwt_required
from flask import jsonify, Response
from game_bot.server.database.models import User


@jwt.authentication_handler
def authentication(username, password):
    with db as session:
        user = session.query(User).filter(User.username == username).one()
        if bcrypt.check_password_hash(user.password, password):
            return user


@jwt.identity_handler
def identity(payload):
    with db as session:
        return session.query(User).filter(User.id == payload["identity"]).one()


@app.route("/api/v1/auth/logged_in")
@jwt_required()
def logged_in_check():
    return Response(status=204)



