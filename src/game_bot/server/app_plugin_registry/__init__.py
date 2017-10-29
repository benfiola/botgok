from game_bot.server.app_plugin_registry.configuration import PluginRegistryConfiguration
from game_bot.server.app_plugin_registry.finder import PluginFinder


class PluginRegistry:
    def __init__(self):
        self.plugin_folder = None
        self.plugins = {}
        self.finder = PluginFinder()

    def init_app(self, app):
        self.configure(PluginRegistryConfiguration.from_dict(app.config))
        app.before_first_request_funcs.append(self.reload_plugins)
        app.extensions["plugin_registry"] = self

    def reload_plugins(self):
        from game_bot.server.app_database.models import PluginRegistry
        from game_bot.server import db

        found_plugins = self.finder.find_plugins()

        with db as session:
            missing_plugins = session.query(PluginRegistry).all()
            for found_plugin in found_plugins:
                name = found_plugin.NAME
                version = found_plugin.VERSION
                path = found_plugin.PATH

                self.plugins.setdefault(name, {}).setdefault(version, found_plugin)
                plugin_record = session.query(PluginRegistry).filter(
                    PluginRegistry.name == name,
                    PluginRegistry.version == version,
                    PluginRegistry.path == path
                ).first()
                if plugin_record:
                    missing_plugins.remove(plugin_record)
                    plugin_record.missing = False
                    session.add(plugin_record)
                else:
                    session.add(PluginRegistry(
                        name=name,
                        version=version,
                        path=path
                    ))

            for missing_plugin in missing_plugins:
                missing_plugin.active = False
                missing_plugin.missing = True
        print(self.plugins)

    def configure(self, configuration):
        self.plugin_folder = configuration.plugin_folder






