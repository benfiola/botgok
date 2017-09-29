from game_bot.bot import current_bot
from game_bot.logging import create_logger
from game_bot.commands import BaseCommand
import asyncio


@create_logger()
class GiphyCommand(BaseCommand):
    def __init__(self):
        super().__init__("giphy", "gif")

    @asyncio.coroutine
    def on_command(self, message_obj, *search_term, **kwargs):
        if search_term:
            search_term = " ".join(search_term)
            result = current_bot.integrations.giphy_client.gif_search(search_term)
            if result:
                yield from current_bot.discord_client.send_message(
                    message_obj.channel,
                    result
                )
            else:
                yield from current_bot.discord_client.send_message(
                    message_obj.channel,
                    "beep-boop!\n\t*cannot compute GIF for {}!*".format(search_term)
                )
