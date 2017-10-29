from game_bot.plugin_core import BasePlugin

class TestPlugin(BasePlugin):
    NAME = "TestPlugin"
    VERSION = "1.0.0"

    def __init__(self):
        super().__init__()