from game_bot.integrations import BaseIntegration, BaseIntegrationConfiguration
from game_bot.exceptions import CommandException
import requests


class CatFactsClient(BaseIntegration):
    class Configuration(BaseIntegrationConfiguration):
        def __init__(self, enabled=False, api_url=None, **kwargs):
            super().__init__(enabled)
            self.api_url = api_url

    def __init__(self):
        super().__init__("cat_facts_client", config_class=self.Configuration)

    def get_cat_fact(self):
        endpoint = "{}/fact".format(self.config.api_url)
        response = requests.get(endpoint)
        if response.status_code == 200:
            return response.json()['fact']
        raise CommandException("API request to {} failed with status code {}".format(endpoint, response.status_code))
