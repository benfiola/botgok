from game_bot.server.app_database import Base
from game_bot.server import bcrypt, app
from sqlalchemy import Column, Integer, String, Boolean


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    admin = Column(Boolean, nullable=False, default=False)

    TEMP_ADMIN_USERNAME = "setup_user"

    def __init__(self, username, password, admin, id=None):
        self.id = id
        self.username = username
        self.password = self.hash_password(password)
        self.admin = admin

    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "admin": self.admin
        }

    @classmethod
    def hash_password(cls, password):
        return bcrypt.generate_password_hash(
            password, app.config.get('BCRYPT_LOG_ROUNDS')
        ).decode()

    @classmethod
    def temp_admin_user(cls):
        from game_bot.server import db
        import uuid
        with db as session:
            temp_user = session.query(cls).filter(
                cls.username == cls.TEMP_ADMIN_USERNAME,
            ).first()
            if temp_user is None:
                temp_user = cls(
                    username=cls.TEMP_ADMIN_USERNAME,
                    password=cls.hash_password(str(uuid.uuid4())),
                    admin=True,
                    id=None
                )
                session.add(temp_user)
        return temp_user



