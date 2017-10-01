from setuptools import setup
from setuptools import find_packages
from glob import glob
from os.path import splitext, basename

setup(
    name="botgok",
    version="0.0.1",
    author="Ben Fiola",
    author_email="benfiola@gmail.com",
    packages=find_packages('src'),
    package_dir={'': 'src'},
    py_modules=[splitext(basename(path))[0] for path in glob('src/*.py')],
    include_package_data=True,
    zip_safe=False,

    scripts=[
        "botgok_server.wsgi",
        "build_botgok_frontend"
    ],

    entry_points={
        "console_scripts": [
            "start-botgok=botgok.bot:Bot.start_bot",
            "start-botgok-server=botgok_server.app:App.start_bot_server"
        ]
    },

    install_requires=[
        "discord.py",
        "steam",
        "pytest",
        "tox",
        "requests",
        "flask",
        "mod_wsgi"
    ]
)