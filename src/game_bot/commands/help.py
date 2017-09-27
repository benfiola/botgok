from game_bot.bot import current_bot
from game_bot.logging import create_logger
from game_bot.commands import BaseCommand
import asyncio
import random


@create_logger()
class HelpCommand(BaseCommand):
    def __init__(self):
        super().__init__("help")

    def generate_help(self):
        lines = [
            "beep-boop!  i'm a bot.\n",
            "i make up for my lack of intelligence by being really charming.",
            "here are some commands you can try:\n"
        ]
        commands = sorted(current_bot.command_handlers.keys())
        for command in commands:
            lines.append("\t{}".format(command))
        return "\n".join(lines)

    @asyncio.coroutine
    def on_command(self, message_obj, *args, **kwargs):
        yield from current_bot.discord_client.send_message(
            message_obj.channel,
            self.generate_help()
        )
