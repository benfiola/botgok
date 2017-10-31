

class API(object):
    def __init__(self):
        pass

    def init_app(self, app):
        import openbot.server.app_api.v1
        app.extensions["api"] = self
