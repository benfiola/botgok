from openbot.server import app, db, auth
from flask import jsonify


@app.route('/api/v1/plugins', methods=["GET"])
@auth.requires_admin()
def get_plugins():
    with db as (session, models):
        to_return = [{
            "name": plugin.name,
            "version": plugin.version,
            "path": plugin.path,
            "missing": plugin.missing,
            "active": plugin.active
        } for plugin in session.query(models.PluginRegistry).all()]
    return jsonify(result=to_return)




