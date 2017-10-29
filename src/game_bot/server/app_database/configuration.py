

class DatabaseConfiguration(object):
    def __init__(self, username, password, url, name, dialect):
        self.username = username
        self.password = password
        self.url = url
        self.name = name
        self.dialect = dialect

    @classmethod
    def from_dict(cls, config_dict):
        return cls(
            username=config_dict["DATABASE_USERNAME"],
            password=config_dict["DATABASE_PASSWORD"],
            url=config_dict["DATABASE_URL"],
            name=config_dict["DATABASE_NAME"],
            dialect=config_dict["DATABASE_DIALECT"]
        )

    def engine_url(self):
        return "{}://{}:{}@{}/{}".format(
            self.dialect, self.username, self.password, self.url, self.name
        )