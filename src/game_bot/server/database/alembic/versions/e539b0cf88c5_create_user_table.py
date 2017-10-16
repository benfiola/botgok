"""create_user_table

Revision ID: e539b0cf88c5
Revises: 
Create Date: 2017-10-16 01:17:06.927069

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e539b0cf88c5'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'user',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('username', sa.String, unique=True, nullable=False),
        sa.Column('password', sa.String, nullable=False),
        sa.Column('admin', sa.Boolean, nullable=False, default=False)
    )


def downgrade():
    op.drop_table(
        'user'
    )
