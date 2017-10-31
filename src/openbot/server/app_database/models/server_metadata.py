from openbot.server.app_database import Base
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
    def _get_or_insert(cls, key, default_value):
        from game_bot.server import db
        with db as session:
            metadata = session.query(cls).filter(
                cls.key == key
            ).first()
            if not metadata:
                metadata = cls(
                    key=key,
                    value=default_value,
                )
                session.add(metadata)
        return metadata

    @classmethod
    def needs_initial_setup(cls):
        return cls._get_or_insert(cls.NEEDS_INITIAL_SETUP, True)

    @classmethod
    def temporary_password_file(cls):
        return cls._get_or_insert(cls.TEMPORARY_PASSWORD_FILE, None)

