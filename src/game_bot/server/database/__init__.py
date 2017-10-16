from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from game_bot.server.database.configuration import DatabaseConfiguration

Base = declarative_base()


class SQLAlchemy(object):
    def __init__(self):
        self.Session = None
        self.context_count = 0
        self.engine = None
        self.Base = Base
        self.tables = None

    def init_app(self, app):
        self.configure(DatabaseConfiguration.from_app_config(app.config))
        app.extensions['db'] = self

    def configure(self, configuration):
        self.engine = create_engine(configuration.engine_url())
        self.Session = scoped_session(sessionmaker(bind=self.engine))
        import game_bot.server.database.models as models

    def __enter__(self):
        self.context_count += 1
        return self.Session()

    def __exit__(self, exc_type, exc_val, exc_traceback):
        self.context_count -= 1
        if self.context_count <= 0:
            if exc_val:
                self.Session().rollback()
            else:
                self.Session().commit()
        if exc_val:
            raise exc_val


db = SQLAlchemy()

