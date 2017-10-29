from game_bot.server.app_database import Base
from sqlalchemy import Column, Integer, String, Boolean


class PluginRegistry(Base):
    __tablename__ = "app_plugin_registry"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    version = Column(String, nullable=False)
    path = Column(String, nullable=False)
    active = Column(Boolean, nullable=False, default=False)

    def __init__(self, name, version, path, active, id=None):
        self.id = id
        self.name = name
        self.version = version
        self.path = path
        self.active = active
