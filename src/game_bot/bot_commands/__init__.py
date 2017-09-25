from game_bot.exceptions import UnimplementedMethodException


class BaseCommandConfiguration(object):
    def __init__(self, enabled=False):
        self.enabled = enabled


class BaseCommand(object):
    def __init__(self, key, config_class):
        self.key = key
        self.config_class = config_class
        self.config = config_class()

    def register(self):
        raise UnimplementedMethodException.create(self.__class__.__name__, "register")


import game_bot.bot_commands.text_processor
import game_bot.bot_commands.shitpoast
