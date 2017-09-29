import json


class Configuration(object):
    class DiscordConfiguration(object):
        def __init__(self, api_token=None, user_id=None, **kwargs):
            self.user_id = user_id
            self.api_token = api_token

    class LoggingConfiguration(object):
        def __init__(self, level=None, console=None, file=None, **kwargs):
            self.log_level = level
            self.file = file
            self.console = console

    def __init__(self, **kwargs):
        discord = kwargs.pop("discord", {})
        logging = kwargs.pop("logging", {})
        integrations = kwargs.pop("integrations", {})
        commands = kwargs.pop("commands", {})

        self.discord = self.DiscordConfiguration(**discord)
        self.logging = self.LoggingConfiguration(**logging)
        self.commands = commands
        self.integrations = integrations

    @classmethod
    def from_json_file(cls, json_file):
        with open(json_file, 'r') as f:
            data = json.loads(f.read())
        return cls(**data)
