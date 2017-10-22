from game_bot.server import create_app
import os

config_file = os.path.join(os.path.dirname(os.path.realpath(__file__)), "config.json")
app = create_app(json_config_file=config_file)
app.run(debug=True, threaded=True)

