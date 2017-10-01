from botgok.bot import current_bot
from botgok.logging import create_logger
from botgok.commands import BaseCommand
import asyncio


@create_logger()
class HelpCommand(BaseCommand):
    def __init__(self):
        super().__init__("help", "?")

    def generate_help(self):
        lines = [
            "beep-boop!  i'm a bot.\n",
            "i make up for my lack of intelligence by being really charming.",
            "here are some commands you can try:\n"
        ]
        main_commands = sorted(list(set([command_handler.key for command_handler in current_bot.command_handlers.values()])))
        for command in main_commands:
            handler = current_bot.command_handlers[command]
            all_commands = " | ".join([handler.key, *handler.aliases])
            lines.append("\t{}".format(all_commands))
        return "\n".join(lines)

    @asyncio.coroutine
    def on_command(self, message_obj, *args, **kwargs):
        yield from current_bot.discord_client.send_message(
            message_obj.channel,
            self.generate_help()
        )
