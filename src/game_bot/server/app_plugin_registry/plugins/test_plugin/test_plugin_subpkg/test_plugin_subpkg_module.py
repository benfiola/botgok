from game_bot.plugin_core import BasePlugin

class PluginOne(BasePlugin):
    NAME = "PluginOne"
    VERSION = "0.0.1"

    def __init__(self):
        super().__init__()