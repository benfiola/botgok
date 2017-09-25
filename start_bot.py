from game_bot import Configuration, client

config = Configuration.from_json_file("config.json")
client.configure(config)
client.run()
