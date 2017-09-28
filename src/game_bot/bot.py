import discord
from game_bot.exceptions import ExistingHandlerException
from game_bot.logging import create_logger, configure_logger
from game_bot.commands import find_all_commands
import asyncio

current_bot = None


@create_logger()
class Bot(object):
    def __init__(self):
        self.discord_client = None
        self.steam_client = None
        self.configuration = None
        self.command_handlers = {}

        global current_bot
        current_bot = self

    def configure(self, configuration):
        configure_logger(configuration)
        self.logger.debug("Configuring Bot")

        self.configuration = configuration
        self.command_handlers = {}
        self.discord_client = discord.Client()
        self.discord_client.event(self.on_message)

        found_commands = find_all_commands()
        self.logger.debug("Found {} commands".format(len(found_commands)))
        for command in found_commands:
            command.configure(configuration)

    def register_command(self, command, handler):
        if command in self.command_handlers:
            raise ExistingHandlerException.create(command, handler.__class__.__name__)
        self.command_handlers[command] = handler
        self.logger.debug("Registered {} with {}".format(command, handler.__class__.__name__))

    def run(self, *args, **kwargs):
        self.logger.debug("Client is running.")
        self.discord_client.run(self.configuration.discord.api_token)

    @classmethod
    def from_command_line(cls):
        import argparse
        from game_bot.configuration import Configuration
        argparser = argparse.ArgumentParser()
        argparser.add_argument("--config_file", type=str, required=True)
        args = argparser.parse_args()

        bot = cls()
        bot.configure(Configuration.from_json_file(args.config_file))
        return bot

    @classmethod
    def start_bot(cls):
        import sys
        Bot.from_command_line().run()
        sys.exit(0)

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
                    self.logger.exception(e)
