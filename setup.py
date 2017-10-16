from setuptools import setup

setup(
    name="game-bot",
    version="0.0.1",
    author="benfiola@gmail.com",
    install_requires=[
        'flask',
        'alembic',
        'sqlalchemy',
        'psycopg2',
        'flask-bcrypt',
        'flask-jwt'
    ]
)