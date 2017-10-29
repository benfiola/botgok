from flask_jwt import JWT, jwt_required


class Auth(JWT):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def requires_login(self):
        def wrapper(fn):
            return jwt_required()(fn)
        return wrapper

    def requires_admin(self):
        def wrapper(fn):
            to_return = jwt_required()(fn)

            def admin_check(*args, kwargs):
                resp = to_return()

            return admin_check
        return wrapper

    def init_app(self, app):
        super().init_app(app)

