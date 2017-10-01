from game_bot.utils import dynamic_package_import
from game_bot.logging import create_logger


class BaseIntegrationConfiguration(object):
    def __init__(self, enabled=False, **kwargs):
        self.enabled = enabled


@create_logger()
class BaseIntegration(object):
    def __init__(self, key, config_class=BaseIntegrationConfiguration):
        self.key = key
        self.config_class = config_class
        self.config = self.config_class()
        self.logger.debug("Created integration {}".format(self.__class__.__name__))

    def configure(self, configuration):
        self.config = self.config_class(**configuration.integrations.get(self.key, {}))
        if self.config.enabled:
            self.logger.debug("Configuring {}".format(self.__class__.__name__))
            from game_bot.bot import current_bot
            current_bot.register_integration(self.key, self)


def find_all_integrations():
    dynamic_package_import(__file__, __package__)
    return [integration() for integration in BaseIntegration.__subclasses__()]