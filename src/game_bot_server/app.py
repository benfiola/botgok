from flask import Flask

current_app = None


class App(Flask):
    def __init__(self, *args, **kwargs):
        super().__init__(
            self.__class__.__name__,

            **kwargs
        )
        self.port = None
        global current_app
        current_app = self

    def configure(self, configuration):
        self.port = configuration.port

        from game_bot_server.api import import_apis
        from game_bot_server.ui import static, templates, import_ui_routes
        import os

        import_apis()
        import_ui_routes()
        static_folder = os.path.dirname(static.__file__)
        template_folder = os.path.dirname(templates.__file__)
        self.static_folder = static_folder
        self.template_folder = template_folder

    def run(self, **kwargs):
        super().run(host="0.0.0.0", port=self.port, **kwargs)

    @classmethod
    def start_bot_server(cls):
        import argparse
        from game_bot_server.configuration import Configuration

        argparser = argparse.ArgumentParser()
        argparser.add_argument("--config_file", type=str, required=True)
        args = argparser.parse_args()

        server = cls()
        server.configure(Configuration.from_json_file(args.config_file))
        server.run()

