from game_bot_server import App, Configuration


app = App()
app.configure(Configuration.from_json_file("config_server.json"))
app.run(debug=True)
