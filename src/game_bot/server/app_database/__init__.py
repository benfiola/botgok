from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from game_bot.server.app_database.configuration import DatabaseConfiguration

Base = declarative_base()


class SQLAlchemy(object):
    def __init__(self):
        self.Session = None
        self.context_count = 0
        self.engine = None
        self.Base = Base
        self.tables = None

    def init_app(self, app):
        self.configure(DatabaseConfiguration.from_dict(app.config))
        app.extensions['db'] = self

        @app.teardown_appcontext
        def close_session(*args, **kwargs):
            session = self.Session()
            session.close()

    def configure(self, configuration):
        self.engine = create_engine(configuration.engine_url())
        self.Session = scoped_session(sessionmaker(bind=self.engine, expire_on_commit=False))
        import game_bot.server.app_database.models as models

    def __enter__(self):
        self.context_count += 1
        session = self.Session()
        return session

    def __exit__(self, exc_type, exc_val, exc_traceback):
        self.context_count -= 1
        session = self.Session()
        if self.context_count <= 0:
            if exc_val:
                session.rollback()
            else:
                session.commit()
        if exc_val:
            raise exc_val


db = SQLAlchemy()

