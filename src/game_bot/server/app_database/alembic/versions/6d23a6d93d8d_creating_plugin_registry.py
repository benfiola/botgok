"""Creating plugin registry

Revision ID: 6d23a6d93d8d
Revises: d4f6ec2436bb
Create Date: 2017-10-28 20:02:04.415964

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6d23a6d93d8d'
down_revision = 'd4f6ec2436bb'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'plugin_registry',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('name', sa.String, nullable=False),
        sa.Column('version', sa.String, nullable=False),
        sa.Column('path', sa.String, nullable=False),
        sa.Column('active', sa.Boolean, nullable=False, default=False),
        sa.Column('missing', sa.Boolean, nullable=False, default=False)
    )


def downgrade():
    op.drop_table(
        'plugin_registry'
    )
