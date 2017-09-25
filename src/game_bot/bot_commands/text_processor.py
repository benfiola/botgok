from game_bot import client
from game_bot.logging import logger
from game_bot.events import BotCommandEvent
from game_bot.bot_commands import BaseCommand, BaseCommandConfiguration
import asyncio

@logger.create()
class TextProcessor(BaseCommand):
    class Configuration(BaseCommandConfiguration):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, **kwargs)

    def __init__(self):
        super().__init__("text_processor", self.Configuration)
        self.logger.debug("Created {}".format(self.__class__.__name__))

    def register(self):
        @client.event
        @asyncio.coroutine
        def on_message(message):
            command = message.content.split(" ")[1:]
            name = "botgok"
            found = [mention for mention in message.mentions if mention.name == name]
            if found and command:
                event = BotCommandEvent(message.channel, command)
                event.dispatch(client)
                self.logger.debug("Dispatching BotCommandEvent")

        self.logger.debug("Registered {}".format(self.__class__.__name__))

