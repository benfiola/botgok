import discord
from game_bot.logging import logger
from game_bot.events import BotCommandEvent
from game_bot.command_registry import CommandRegistry
import asyncio


@logger.create()
class Client(discord.Client):
    def __init__(self):
        super().__init__()
        self.logger.debug("Creating Client")
        self.configuration = None
        self.module_registry = CommandRegistry()
        self.bot_command_handlers = []

    def configure(self, configuration):
        self.logger.debug("Configuring Client")
        self.configuration = configuration
        self.module_registry.configure(configuration)

    def run(self, *args, **kwargs):
        self.logger.debug("Client is running.")
        super().run(self.configuration.token)

    @asyncio.coroutine
    def on_bot_command(self, *args, **kwargs):
        for handler in self.bot_command_handlers:
            yield from handler(*args, **kwargs)

    def event(self, func):
        if func.__name__ == BotCommandEvent.COROUTINE_NAME:
            self.bot_command_handlers.append(func)
            return func
        else:
            return super().event(func)

