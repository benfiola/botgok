import pytest
from game_bot.configuration import Configuration


class TestSuite():
    def test_init(self):
        token = "test"
        c = Configuration(
            token=token
        )
        assert c.token == token
        print("tested")
