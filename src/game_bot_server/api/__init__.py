from game_bot_server.utils import dynamic_package_import


def import_apis():
    dynamic_package_import(__file__, __package__)
