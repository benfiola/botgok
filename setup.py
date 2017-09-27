from setuptools import setup
from setuptools import find_packages
from glob import glob
from os.path import splitext, basename

setup(
    name="game_bot",
    version="0.0.1",
    author="Ben Fiola",
    author_email="benfiola@gmail.com",
    packages=find_packages('src'),
    package_dir={'': 'src'},
    py_modules=[splitext(basename(path))[0] for path in glob('src/*.py')],
    include_package_data=True,
    zip_safe=False,

    entry_points={
        "console_scripts": ["start-bot=game_bot.bot:Bot.start_bot"]
    },
    install_requires=[
        "discord.py",
        "steam",
        "pytest",
        "tox"
    ]
)