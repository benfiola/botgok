import discord
from game_bot.exceptions import AlreadyExistsException
from game_bot.logging import create_logger, configure_logger
from game_bot.commands import find_all_commands
from game_bot.integrations import find_all_integrations
import asyncio

current_bot = None


@create_logger()
class Bot(object):
    def __init__(self):
        self.discord_client = None
        self.integrations = IntegrationObject()
        self.configuration = None
        self.command_handlers = {}

        global current_bot
        current_bot = self

    def configure(self, configuration):
        configure_logger(configuration)
        self.logger.debug("Configuring Bot")

        self.configuration = configuration
        self.integrations = IntegrationObject()
        self.command_handlers = {}
        self.discord_client = discord.Client()
        self.discord_client.event(self.on_message)

        found_integrations = find_all_integrations()
        self.logger.debug("Found {} integrations".format(len(found_integrations)))
        for integration in found_integrations:
            integration.configure(configuration)

        found_commands = find_all_commands()
        self.logger.debug("Found {} commands".format(len(found_commands)))
        for command in found_commands:
            command.configure(configuration)

    def register_integration(self, key, integration):
        if key in self.integrations:
            raise AlreadyExistsException.create("integration", key)
        self.integrations[key] = integration
        self.logger.debug("Registered integration {} with {}".format(key, integration.__class__.__name__))

    def register_command(self, command, handler):
        if command in self.command_handlers:
            raise AlreadyExistsException.create("command", command)
        self.command_handlers[command] = handler
        self.logger.debug("Registered command {} with {}".format(command, handler.__class__.__name__))

    def run(self, *args, **kwargs):
        self.logger.debug("Client is running.")
        self.discord_client.run(self.configuration.discord.api_token)

    @classmethod
    def start_bot(cls):
        import argparse
        from game_bot.configuration import Configuration
        argparser = argparse.ArgumentParser()
        argparser.add_argument("--config_file", type=str, required=True)
        args = argparser.parse_args()
        bot = cls()
        bot.configure(Configuration.from_json_file(args.config_file))
        bot.run()

    @asyncio.coroutine
    def on_message(self, message):
        message_tokens = message.content.split()
        bot_mentioned = [mention for mention in message.mentions if mention.id == self.configuration.discord.user_id]
        if bot_mentioned and len(message_tokens) > 1:
            command = message_tokens[1]
            if command in self.command_handlers:
                try:
                    handler = self.command_handlers[command]
                    yield from handler.on_command(message, *message_tokens[2:])
                except Exception as e:
                    yield from self.discord_client.send_message(
                        message.channel,
                        "*failure to compute intensifies*\nbeep-boop!  check my diagnostic logs!"
                    )
                    self.logger.exception(e)


class IntegrationObject(dict):
    def __init__(self):
        super().__init__()

    def __getattr__(self, attr):
        return self.get(attr, None)

