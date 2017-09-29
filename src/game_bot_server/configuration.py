import json


class Configuration(object):
    def __init__(self, port=None, bot_config_file=None, **kwargs):
        self.port = port
        self.bot_config_file = bot_config_file

    @classmethod
    def from_json_file(cls, file_name):
        with open(file_name, 'r') as f:
            data = json.loads(f.read())
        return cls(**data)