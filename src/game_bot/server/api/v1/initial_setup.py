from game_bot.server import app, db
from game_bot.server.database.models import User, ServerMetadata
from flask import jsonify, Response, request
from flask_jwt import jwt_required
import tempfile
import os
import uuid


@app.route('/api/v1/initial_setup/check', methods=['GET'])
def initial_setup_check():
    return jsonify(
        result=bool(ServerMetadata.needs_initial_setup().value)
    )


@app.route('/api/v1/initial_setup/initialize', methods=['GET'])
def initial_setup_initialize():
    with db as session:
        # only allow this if we need to set ourselves up
        if not ServerMetadata.needs_initial_setup().value:
            return Response(status=401)

        # generate a new password for a temporary admin user
        password = str(uuid.uuid4())
        temp_admin_user = User.temp_admin_user()
        temp_admin_user.password = User.hash_password(password)
        session.add(temp_admin_user)

        # generate a temporary file holding the password for this
        # temporary user on the server
        temp_file = ServerMetadata.temporary_password_file()
        if not temp_file.value:
            temp_file.value = create_temporary_password_file()
        write_password_to_file(
            temp_file.value,
            password
        )
        return jsonify(result=temp_file.value)


@app.route('/api/v1/initial_setup/create_admin_user', methods=['POST'])
@jwt_required
def initial_setup_create_admin_user():
    with db as session:
        needs_initial_setup = ServerMetadata.needs_initial_setup()

        # if we're not in the initial setup flow, disallow this
        if not needs_initial_setup.value:
            return Response(status=401)

        # grab request data and add our user
        username = request.json["username"]
        password = request.json["password"]
        new_user = User(
            username=username,
            password=password,
            admin=True
        )
        session.add(new_user)

        # delete the temp user used to create this admin user
        temp_user = User.temp_admin_user()
        session.delete(temp_user)

        # delete the file storing the temporary password for the user
        # we've just deleted
        temp_file = ServerMetadata.temporary_password_file()
        delete_temporary_password_file(temp_file.value)
        temp_file.value = None
        session.add(temp_file)

        # unset the needs_initial_setup value
        needs_initial_setup.value = False
        session.add(needs_initial_setup)
    return Response(status=201, headers={
        "Location": "/api/v1/users/{}".format(new_user.id)
    })


def create_temporary_password_file():
    (fd, file_path) = tempfile.mkstemp(prefix="game_bot_")
    with os.fdopen(fd, 'w') as _:
        pass
    return file_path


def write_password_to_file(file_path, password):
    with open(file_path, 'w') as f:
        f.write(password)


def read_password_from_file(file_path):
    with open(file_path, 'r') as f:
        return f.read()


def delete_temporary_password_file(file_path):
    if os.path.isfile(file_path):
        os.remove(file_path)

