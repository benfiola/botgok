import logging


class CustomLogger(logging.Logger):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def create(self):
        """
        Decorates a class and sets a class-level logger object
        :return:
        """
        def wrapper(decorated_class):
            _logger = self.getChild("python_bomberman.{}".format(decorated_class.__name__))
            setattr(decorated_class, "logger", _logger)
            return decorated_class
        return wrapper



logging.setLoggerClass(CustomLogger)
logger = logging.getLogger("game_bot")
logger.setLevel(logging.DEBUG)

DATE_FORMAT = "%m/%d/%Y %H:%M:%S"
FORMAT = '[%(levelname)s][%(asctime)s][%(module)s]: %(message)s'

formatter = logging.Formatter(FORMAT, DATE_FORMAT)
console_handler = logging.StreamHandler()
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)
