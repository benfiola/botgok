import json


class Configuration(object):
    def __init__(self, token=None, bot_commands=None):
        self.token = token
        self.bot_commands = bot_commands

    def get_command_configuration(self, config_key):
        return self.bot_commands.get(config_key, {})

    @classmethod
    def from_json_file(cls, json_file):
        with open(json_file, 'r') as f:
            data = json.loads(f.read())
        return cls(**data)