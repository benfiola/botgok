

class API(object):
    def __init__(self):
        pass

    def init_app(self, app):
        import game_bot.server.api.v1
        app.extensions["api"] = self
