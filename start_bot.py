from game_bot import Bot, Configuration


bot = Bot()
bot.configure(Configuration.from_json_file("config.json"))
bot.run()

