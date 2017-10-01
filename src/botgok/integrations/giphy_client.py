from game_bot.integrations import BaseIntegration, BaseIntegrationConfiguration
from game_bot.exceptions import CommandException
import requests
import random


class GiphyClient(BaseIntegration):
    class Configuration(BaseIntegrationConfiguration):
        def __init__(self, enabled=False, api_url=None, api_key=None, **kwargs):
            super().__init__(enabled)
            self.api_url = api_url
            self.api_key = api_key

    def __init__(self):
        super().__init__("giphy_client", config_class=self.Configuration)

    def random_gif(self):
        endpoint = "{}/gifs/random?api_key={}&rating=PG-13".format(self.config.api_url, self.config.api_key)
        response = requests.get(endpoint)
        if response.status_code == 200:
            gif = response.json().get("data", None)
            if gif:
                return gif["url"]
            return None
        raise CommandException("API request to {} failed with status code {}".format(endpoint, response.status_code))

    def gif_search(self, search_term):
        endpoint = "{}/gifs/search?api_key={}&q={}&limit=100&offset=0&rating=PG-13&lang=en".format(self.config.api_url, self.config.api_key, search_term)
        response = requests.get(endpoint)
        if response.status_code == 200:
            data = response.json()["data"]
            if data:
                gif = data[random.randint(0, len(data)-1)]
                return gif["url"]
            return None
        raise CommandException("API request to {} failed with status code {}".format(endpoint, response.status_code))
