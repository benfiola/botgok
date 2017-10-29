from game_bot.plugin_core import BasePlugin

class TestPlugin(BasePlugin):
    def __init__(self):
        super().__init__("test", "1.0.0")