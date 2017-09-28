from game_bot.utils import dynamic_package_import
from game_bot.logging import create_logger
from game_bot.exceptions import UnimplementedMethodException


class BaseCommandConfiguration(object):
    def __init__(self, enabled=False, **kwargs):
        self.enabled = enabled


@create_logger()
class BaseCommand(object):
    def __init__(self, key, *aliases, config_class=BaseCommandConfiguration):
        self.key = key
        self.aliases = aliases
        self.config_class = config_class
        self.config = config_class()
        self.logger.debug("Created {}".format(self.__class__.__name__))

    def configure(self, configuration):
        self.config = self.config_class(**configuration.commands.get(self.key, {}))
        if self.config.enabled:
            self.logger.debug("Enabled {}".format(self.__class__.__name__))
            from game_bot.bot import current_bot
            current_bot.register_command(self.key, self)
            for alias in self.aliases:
                current_bot.register_command(alias, self)

    def on_command(self, message_obj, *tokens, **kwargs):
        raise UnimplementedMethodException.create(self.__class__.__name__, "on_command")


def find_all_commands():
    dynamic_package_import(__file__, __package__)
    return [command() for command in BaseCommand.__subclasses__()]