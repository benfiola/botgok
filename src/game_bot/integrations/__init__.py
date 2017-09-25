from game_bot.utils import dynamic_package_import


class BaseIntegration(object):
    def __init__(self):
        pass


def find_all():
    dynamic_package_import(__file__, __package__)
    return [command for command in BaseCommand.__subclasses__()]