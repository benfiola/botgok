from game_bot import client
from game_bot.logging import logger
from game_bot.bot_commands import BaseCommand, BaseCommandConfiguration
import asyncio
import random


@logger.create()
class ShitpoastCommand(BaseCommand):
    class Configuration(BaseCommandConfiguration):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, **kwargs)

    def __init__(self):
        super().__init__("shitpoast", self.Configuration)
        self.logger.debug("Created {}".format(self.__class__.__name__))

    def get_random_shitpoast(self):
        valid_shitpoasts = [
            "lol u suck {}",
            "haha git gud {} u scrub",
            "got emmmmmmm {} sucks",
            "henlo u stinky {}",
            "pls uninstall, {}"
        ]
        return valid_shitpoasts[random.randint(0, len(valid_shitpoasts) - 1)]

    def register(self):
        @client.event
        @asyncio.coroutine
        def on_bot_command(channel, module_cmd, shitpoast_target=None, **kwargs):
            if module_cmd == self.key and shitpoast_target:
                yield from client.send_message(channel, self.get_random_shitpoast().format(shitpoast_target))
        self.logger.debug("Registered {}".format(self.__class__.__name__))
