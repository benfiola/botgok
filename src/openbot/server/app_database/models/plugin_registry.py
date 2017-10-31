from openbot.server.app_database import Base
from sqlalchemy import Column, Integer, String, Boolean


class PluginRegistry(Base):
    __tablename__ = "plugin_registry"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    version = Column(String, nullable=False)
    active = Column(Boolean, nullable=False, default=False)
    missing = Column(Boolean, nullable=False, default=False)

    def __init__(self, name, version, active=False, missing=False, id=None):
        self.id = id
        self.name = name
        self.version = version
        self.active = active
        self.missing = missing
