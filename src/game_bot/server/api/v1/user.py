from game_bot.server import app, db

@app.route('/api/v1/user', methods=['GET'])
@app.route('/api/v1/user/<int:user_id>', methods=['GET'])
def get_user(user_id=None):
    with db as (session, tables):
        print(db)
        pass
