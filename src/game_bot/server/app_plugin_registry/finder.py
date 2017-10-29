import importlib
import importlib.abc
import importlib.util
import pkgutil
import sys


class PluginFinder(object):
    def __init__(self):
        pass

    def get_installed_modules(self):
        import game_bot.server.app_plugin_registry.plugins as plugin_package

        prefix = "{}.".format(plugin_package.__name__)
        return [
            FoundPackageData(
                finder=finder,
                full_name=full_name,
                is_package=is_package,
                module_name=full_name.replace(prefix, "")
            ) for (finder, full_name, is_package)
            in pkgutil.iter_modules(plugin_package.__path__, prefix)
        ]

    def find_plugins(self):
        from game_bot.plugin_core import BasePlugin

        to_return = []
        module_path_cache = {}

        installed_modules = self.get_installed_modules()
        for installed_module in installed_modules:
            module_path_cache[installed_module.module_name] = installed_module

        meta_path_finder = WrappedMetaPathFinder.create(module_path_cache)
        sys.meta_path.append(meta_path_finder)

        for installed_module in installed_modules:
            before = set(BasePlugin.__subclasses__())
            imported_module = importlib.import_module(installed_module.full_name)
            after = set(BasePlugin.__subclasses__())
            new_plugins = after.difference(before)

            root_path = imported_module.__spec__.origin
            if imported_module.__path__:
                root_path = imported_module.__path__[0]
            for plugin in new_plugins:
                setattr(plugin, "PATH", root_path)
                setattr(plugin, "FULL_NAME", installed_module.full_name)
                setattr(plugin, "MODULE_NAME", installed_module.module_name)
                to_return.append(plugin)

        sys.meta_path.remove(meta_path_finder)

        return to_return


class WrappedMetaPathFinder(object):
    @staticmethod
    def create(installed_modules):
        class _MetaPathFinder(importlib.abc.MetaPathFinder):
            @staticmethod
            def find_spec(fullname, path, target=None):
                spec = None
                if fullname in installed_modules:
                    installed_module = installed_modules[fullname]
                    spec = importlib.util.find_spec(installed_module.full_name)
                    spec.name = installed_module.module_name
                    spec.loader.name = installed_module.module_name
                return spec
        return _MetaPathFinder


class FoundPackageData(object):
    def __init__(self, finder, full_name, module_name, is_package):
        self.finder = finder
        self.full_name = full_name
        self.module_name = module_name
        self.is_package = is_package