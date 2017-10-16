

class DatabaseConfiguration(object):
    def __init__(self, username, password, url, name, dialect):
        self.username = username
        self.password = password
        self.url = url
        self.name = name
        self.dialect = dialect

    @classmethod
    def from_app_config(cls, app_config):
        return cls(
            username=app_config["DATABASE_USERNAME"],
            password=app_config["DATABASE_PASSWORD"],
            url=app_config["DATABASE_URL"],
            name=app_config["DATABASE_NAME"],
            dialect=app_config["DATABASE_DIALECT"]
        )

    def engine_url(self):
        return "{}://{}:{}@{}/{}".format(
            self.dialect, self.username, self.password, self.url, self.name
        )