

class UnimplementedMethodException(Exception):
    def __init__(self, *args):
        super().__init__(*args)

    @classmethod
    def create(cls, class_name, method_name):
        return cls("{}:{} is unimplemented".format(class_name, method_name))