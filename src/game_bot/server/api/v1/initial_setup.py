from game_bot.server import app, db, bcrypt
from game_bot.server.database.models import User, ServerMetadata
from flask import jsonify, Response, request
import tempfile
import os
import uuid


@app.route('/api/v1/initial_setup/check', methods=['GET'])
def needs_initial_setup():
    return jsonify(
        result=ServerMetadata.needs_initial_setup()
    )


@app.route('/api/v1/initial_setup/initialize', methods=['GET'])
def initialize():
    with db as session:
        if ServerMetadata.needs_initial_setup():
            password = str(uuid.uuid4())
            User.temp_admin_user(password)

            temp_file = ServerMetadata.temporary_password_file()
            if not temp_file:
                temp_file = ServerMetadata.temporary_password_file(create_temporary_password_file())

            write_password_to_file(
                temp_file,
                password
            )
            return jsonify(result=temp_file)
        else:
            return Response(status=401)


@app.route('/api/v1/initial_setup/create_admin_user', methods=['POST'])
def create_admin_user():
    with db as session:
        if not ServerMetadata.needs_initial_setup():
            return Response(status=401)
        else:
            username = request.json["username"]
            password = request.json["password"]
            new_user = User(
                username=username,
                password=password,
                admin=True
            )
            session.add(new_user)

            temp_user = User.temp_admin_user()
            temp_file = ServerMetadata.temporary_password_file()
            session.delete(temp_user)
            ServerMetadata.needs_initial_setup(False)
            ServerMetadata.temporary_password_file(None)
    delete_temporary_password_file(temp_file)
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

