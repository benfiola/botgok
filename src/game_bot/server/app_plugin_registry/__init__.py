from game_bot.server.app_plugin_registry.configuration import PluginRegistryConfiguration


class PluginRegistry:
    def __init__(self):
        self.plugin_folder = None

    def init_app(self, app):
        self.configure(PluginRegistryConfiguration.from_dict(app.config))
        app.before_first_request_funcs.append(self.reload_plugins)
        app.extensions["app_plugin_registry"] = self

    def find_installed_plugins(self):
        import pkgutil
        import game_bot.server.app_plugin_registry.plugins as ns_pkg
        prefix = "{}.".format(ns_pkg.__name__)
        return [
            (finder, name, ispkg, name.replace(prefix, ""))
            for (finder, name, ispkg)
            in pkgutil.iter_modules(ns_pkg.__path__, prefix)
        ]

    def reload_plugins(self):
        from game_bot.server import db
        import importlib
        from game_bot.plugin_core import BasePlugin

        found_plugins = {}
        for (finder, pkg_name, ispkg, plugin_name) in self.find_installed_plugins():
            if ispkg:
                print(pkg_name)
                imported_module = importlib.import_module(pkg_name)
                importlib.invalidate_caches()
                print(imported_module)

        for cls in BasePlugin.__subclasses__():
            print(cls)


        with db as session:
            pass

    def configure(self, configuration):
        self.plugin_folder = configuration.plugin_folder
