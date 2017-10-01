from botgok.bot import current_bot
from botgok.logging import create_logger
from botgok.commands import BaseCommand
import asyncio
import random


@create_logger()
class GreetCommand(BaseCommand):
    def __init__(self):
        super().__init__("greet", "g")

    def get_random_greeting(self, name):
        valid_greetings = [
            "henlo u stinky {}",
            "henlo {}",
            "greetings, {}!",
            "salutations, {}!",
            "ey {} wyd",
            "hi."
        ]
        return valid_greetings[
            random.randint(0, len(valid_greetings) - 1)
        ].format(name)

    @asyncio.coroutine
    def on_command(self, message_obj, *greeting_target, **kwargs):
        if greeting_target:
            yield from current_bot.discord_client.send_message(
                message_obj.channel,
                self.get_random_greeting(" ".join(greeting_target))
            )
