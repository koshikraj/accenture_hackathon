"""create tables

Revision ID: 70a853f5e46a
Revises:
Create Date: 2018-08-25 13:54:19.121463

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '70a853f5e46a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'user',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(50)),
        sa.Column('email', sa.String(155)),
        sa.Column('public_address', sa.String(155)),
        sa.Column('photo', sa.String(50)),
    ),

    op.create_table(
        'repository',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(50)),

    ),
    op.create_table(
        'ratings',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('rating', sa.Integer),
        sa.Column('votes', sa.Integer),
        sa.Column('user_id', sa.Integer, sa.ForeignKey('user.id')),
        sa.Column('repo_id', sa.Integer),
    )


def downgrade():
    op.drop_table('user')
    op.drop_table('repository')
    op.drop_table('ratings')
