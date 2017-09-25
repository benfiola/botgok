from game_bot.logging import logger


@logger.create()
class CommandRegistry(object):
    def __init__(self):
        self.commands = {}
        self.logger.debug("CommandRegistry created.")

    def find_commands(self):
        from game_bot.bot_commands import BaseCommand
        command_classes = BaseCommand.__subclasses__()
        self.logger.debug("Found {} commands".format(len(command_classes)))

        for command_cls in command_classes:
            command = command_cls()
            self.commands[command.key] = command

    def configure(self, configuration):
        self.logger.debug("Configuring CommandRegistry")
        self.find_commands()

        for command in self.commands.values():
            command.config = command.config_class(**configuration.get_command_configuration(command.key))
            if command.config.enabled:
                command.register()
            else:
                self.logger.debug("Not registering {} because it is disabled via configuration".format(command.__class__.__name__))
