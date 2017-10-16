from flask import Flask


class App(Flask):
    def __init__(self, *args, **kwargs):
        super().__init__(__name__, *args, **kwargs)
