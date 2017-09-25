

class BotCommandEvent(object):
    EVENT_TYPE = "bot_command"
    COROUTINE_NAME = "on_{}".format(EVENT_TYPE)

    def __init__(self, channel, command):
        self.channel = channel
        self.command = command

    def dispatch(self, client):
        client.dispatch(self.EVENT_TYPE, self.channel, *self.command)

