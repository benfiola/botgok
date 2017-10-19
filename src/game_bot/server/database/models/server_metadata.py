from game_bot.server.database import Base
from game_bot.server import bcrypt, app
from sqlalchemy import Column, Integer, String, Boolean

class ServerMetadata(Base):
    __tablename__ = "server_metadata"

    initial_setup_completed = Column(Boolean, nullable=False, default=False)
    temporary_password_file = Column(String, nullable=False)

    def __init__(self, initial_setup_completed):
        pass