

class CommandException(Exception):
    def __init__(self, *args):
        super().__init__(*args)

class AlreadyExistsException(Exception):
    def __init__(self, *args):
        super().__init__(*args)

    @classmethod
    def create(cls, obj_type, value):
        return cls("{} {} already exists".format(obj_type, value))


class UnimplementedMethodException(Exception):
    def __init__(self, *args):
        super().__init__(*args)

    @classmethod
    def create(cls, class_name, method_name):
        return cls("{}:{} is unimplemented".format(class_name, method_name))