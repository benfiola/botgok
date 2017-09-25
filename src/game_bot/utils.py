import os
import importlib


def dynamic_package_import(module_file, module_package):
    for file in os.listdir(path=os.path.dirname(module_file)):
        full_path = os.path.join(os.path.dirname(module_file), file)
        if os.path.isfile(full_path) and full_path.endswith(".py"):
            if file != "__init__.py":
                (filename, _) = os.path.splitext(file)
                module_name = "{}.{}".format(module_package, filename)
                importlib.import_module(module_name, package=__package__)