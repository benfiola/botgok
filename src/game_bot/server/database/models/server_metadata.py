from game_bot.server.database import Base
from sqlalchemy import Column, String, Integer


class ServerMetadata(Base):
    __tablename__ = "server_metadata"

    id = Column(Integer, primary_key=True, autoincrement=True)
    key = Column(String, nullable=False, unique=True)
    value = Column(String, nullable=True)

    NEEDS_INITIAL_SETUP = "needs_initial_setup"
    TEMPORARY_PASSWORD_FILE = "temporary_password_file"

    def __init__(self, key, value, id=None):
        self.id = id
        self.key = key
        self.value = value

    @classmethod
    def _get(cls, key, default_value=None):
        from game_bot.server import db
        with db as session:
            result = session.query(cls).filter(
                cls.key == key
            ).first()
            if result is None:
                result = cls(
                    key=key,
                    value=default_value
                )
                session.add(result)
        return result

    @classmethod
    def needs_initial_setup(cls, value=None):
        from game_bot.server import db
        with db as session:
            result = cls._get(cls.NEEDS_INITIAL_SETUP, True)
            if value is not None:
                result.value = value
                session.add(result)
        return bool(result.value)

    @classmethod
    def temporary_password_file(cls, value=None):
        from game_bot.server import db
        with db as session:
            result = cls._get(cls.TEMPORARY_PASSWORD_FILE)
            if value is not None:
                result.value = value
                session.add(result)
        return result.value
