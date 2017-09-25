import logging
import os


ROOT_LOGGER_KEY = "game_bot"
DATE_FMT = "%m/%d/%Y %H:%M:%S"
FMT = '[%(levelname)s][%(asctime)s][%(module)s]: %(message)s'


def create_logger():
    def wrapper(decorated_class):
        _logger = logging.getLogger("{}.{}".format(ROOT_LOGGER_KEY, decorated_class.__name__))
        setattr(decorated_class, "logger", _logger)
        return decorated_class
    return wrapper


def configure_logger(configuration):
    logger = logging.getLogger(ROOT_LOGGER_KEY)

    # set our log level
    log_levels = {
        "debug": logging.DEBUG,
        "error": logging.ERROR,
        "info": logging.INFO
    }
    log_level = log_levels.get(configuration.logging.log_level.lower(), logging.INFO)
    logger.setLevel(log_level)

    # define our formats for date/messages
    formatter = logging.Formatter(FMT, DATE_FMT)

    if configuration.logging.console:
        console_handler = logging.StreamHandler()
        console_handler.setFormatter(formatter)
        logger.addHandler(console_handler)

    if configuration.logging.file:
        if not os.path.exists(configuration.logging.file):
            open(configuration.logging.file, 'w+').close()
        file_handler = logging.FileHandler(
            encoding="UTF-8",
            filename=configuration.logging.file
        )
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)
