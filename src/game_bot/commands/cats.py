from game_bot.bot import current_bot
from game_bot.logging import create_logger
from game_bot.commands import BaseCommand
import asyncio


@create_logger()
class CatsCommand(BaseCommand):
    def __init__(self):
        super().__init__("cats", "c")

    @asyncio.coroutine
    def on_command(self, message_obj, *args, **kwargs):
        client = current_bot.integrations.cat_facts_client
        yield from current_bot.discord_client.send_message(
            message_obj.channel,
            client.get_cat_fact()
        )


