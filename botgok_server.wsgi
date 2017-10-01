from botgok_server import App, Configuration

_application = App()
configured = False

# we provide a wrapper around the app to configure it
# with information we get from our apache configuration file
# http://modwsgi.readthedocs.io/en/develop/user-guides/configuration-guidelines.html#application-configuration
# since this is invoked on every response, we only want to do this once.
def application(environ, start_response):
    global configured
    if not configured:
        config = Configuration.from_json_file(environ["BOT_SERVER_CONFIG_FILE"])
        _application.configure(config)
    return _application(environ, start_response)


