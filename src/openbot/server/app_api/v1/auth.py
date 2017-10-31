from openbot.server import auth, db, bcrypt, app
from flask import Response

@auth.authentication_handler
def authentication(username, password):
    with db as (session, models):
        user = session.query(models.User).filter(models.User.username == username).one()
        if bcrypt.check_password_hash(user.password, password):
            return user


@auth.identity_handler
def identity(payload):
    with db as (session, models):
        return session.query(models.User).filter(models.User.id == payload["identity"]).one()


@app.route("/api/v1/auth/logged_in")
@auth.requires_login()
def logged_in_check():
    return Response(status=204)



