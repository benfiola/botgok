import os


class UI(object):
    def __init__(self):
        pass

    def init_app(self, app):
        current_dir = os.path.dirname(__file__)
        app.static_folder = os.path.join(current_dir, "static")
        app.template_folder = os.path.join(current_dir, "templates")
        import game_bot.server.app_ui.routes
        app.extensions["app_ui"] = self
