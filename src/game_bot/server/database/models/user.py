from game_bot.server.database import Base
from game_bot.server import bcrypt, app
from sqlalchemy import Column, Integer, String, Boolean


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    admin = Column(Boolean, nullable=False, default=False)

    def __init__(self, id, username, password, admin):
        self.id = id
        self.username = username
        self.password = bcrypt.generate_password_hash(
            password, app.config.get('BCRYPT_LOG_ROUNDS')
        ).decode()
        self.admin = admin
