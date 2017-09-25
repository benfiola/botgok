from game_bot.bot import current_bot
from game_bot.logging import create_logger
from game_bot.commands import BaseCommand
import asyncio
import random


@create_logger()
class ShitpoastCommand(BaseCommand):
    def __init__(self):
        super().__init__("shitpoast")

    def get_random_shitpoast(self):
        valid_shitpoasts = [
            "lol u suck {}",
            "haha git gud {} u scrub",
            "got emmmmmmm {} sucks",
            "henlo u stinky {}",
            "pls uninstall, {}"
        ]
        return valid_shitpoasts[random.randint(0, len(valid_shitpoasts) - 1)]

    @asyncio.coroutine
    def on_command(self, message_obj, *shitpoast_target, **kwargs):
        if shitpoast_target:
            yield from current_bot.discord_client.send_message(
                message_obj.channel,
                self.get_random_shitpoast().format(
                    " ".join(shitpoast_target)
                )
            )
