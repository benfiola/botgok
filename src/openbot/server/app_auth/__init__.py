from flask_jwt import JWT, jwt_required
import functools


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

            @functools.wraps(fn)
            def admin_check(*args, **kwargs):
                resp = to_return(*args, **kwargs)
                from flask import Response
                from flask_jwt import current_identity
                if not current_identity.admin:
                    return Response(status=401)
                return resp
            return admin_check
        return wrapper

    def init_app(self, app):
        super().init_app(app)

