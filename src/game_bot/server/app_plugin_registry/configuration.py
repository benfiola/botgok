

class PluginRegistryConfiguration(object):
    def __init__(self, plugin_folder):
        self.plugin_folder = plugin_folder

    @classmethod
    def from_dict(cls, dictionary):
        return cls(
            plugin_folder=dictionary["PLUGIN_FOLDER"]
        )