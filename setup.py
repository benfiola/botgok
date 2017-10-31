from setuptools import setup, find_packages
from glob import glob
from os.path import splitext, basename

setup(
    name="openbot",
    version="0.0.1",
    author="benfiola@gmail.com",
    packages=find_packages('src'),
    package_dir={'': 'src'},
    py_modules=[splitext(basename(path))[0] for path in glob('src/*.py')],
    include_package_data=True,
    install_requires=[
        'flask',
        'alembic',
        'sqlalchemy',
        'psycopg2',
        'flask-bcrypt',
        'flask-jwt',
        'pip'
    ]
)