from game_bot_server.app import current_app


@current_app.route('/api/v1/ping')
def test():
    return "pong"