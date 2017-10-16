from game_bot.server import create_app
import os

config_file = os.path.join(os.path.dirname(__file__), "dev_server_config.json")
app = create_app(json_config_file=config_file)
app.run()

