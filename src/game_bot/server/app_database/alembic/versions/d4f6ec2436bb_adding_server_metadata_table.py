"""adding server metadata table

Revision ID: d4f6ec2436bb
Revises: e539b0cf88c5
Create Date: 2017-10-19 21:14:07.259778

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd4f6ec2436bb'
down_revision = 'e539b0cf88c5'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'server_metadata',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('key', sa.String, unique=True, nullable=False),
        sa.Column('value', sa.String),
    )


def downgrade():
    op.drop_table(
        'server_metadata'
    )
