class PluginRegistry:
    PLUGIN_PREFIX = "openbot_"

    def __init__(self):
        self.plugin_folder = None
        self.plugins = {}

    def find_installed_plugins(self):
        import pip
        return [p for p in pip.utils.get_installed_distributions() if p.name.startswith(self.PLUGIN_PREFIX)]

    def init_app(self, app):
        app.before_first_request_funcs.append(self.reload_plugins)
        app.extensions["plugin_registry"] = self

    def reload_plugins(self):
        self.synchronize_database()

    def synchronize_database(self):
        from openbot.server.app_database.models import PluginRegistry
        from openbot.server import db

        found_plugins = self.find_installed_plugins()
        self.plugins = {}

        with db as session:
            missing_plugins = session.query(PluginRegistry).all()
            for found_plugin in found_plugins:
                name = found_plugin.name
                version = found_plugin.version

                self.plugins.setdefault(name, {}).setdefault(version, found_plugin)
                plugin_record = session.query(PluginRegistry).filter(
                    PluginRegistry.name == name,
                    PluginRegistry.version == version
                ).first()
                if plugin_record:
                    missing_plugins.remove(plugin_record)
                    plugin_record.missing = False
                    session.add(plugin_record)
                else:
                    session.add(PluginRegistry(
                        name=name,
                        version=version,
                        missing=False,
                        active=False
                    ))

            for missing_plugin in missing_plugins:
                missing_plugin.active = False
                missing_plugin.missing = True
                session.add(missing_plugin)

