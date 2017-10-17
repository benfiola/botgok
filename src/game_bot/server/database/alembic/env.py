from __future__ import with_statement
from alembic import context
from sqlalchemy import create_engine
from logging.config import fileConfig
import os
import json
from game_bot.server.database.configuration import DatabaseConfiguration

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata
target_metadata = None

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def get_database_config():
    config_file = context.get_x_argument(as_dictionary=True).get("config_file")
    if config_file is None:
        raise ValueError("Missing argument: config_file.  as -x config_file=<file_path>")
    if not os.path.exists(config_file) or not os.path.isfile(config_file):
        raise ValueError("Config file at location {} is invalid".format(config_file))
    with open(config_file, 'r') as f:
        return DatabaseConfiguration.from_dict(json.loads(f.read()))


def run_migrations_offline():
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    database_config = get_database_config()
    context.configure(
        url=database_config.engine_url(), target_metadata=target_metadata, literal_binds=True)

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    database_config = get_database_config()
    connectable = create_engine(database_config.engine_url())

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
