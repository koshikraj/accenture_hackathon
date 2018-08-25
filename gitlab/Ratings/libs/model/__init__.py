from sqlalchemy import create_engine
from sqlalchemy.pool import NullPool
from sqlalchemy.orm import sessionmaker
from config import repo_db

from utils.logger import logger

log = logger(__name__)

print('models sessions imported')

"""
    Using Null pool to disable pooling,

    About NullPool:
    A Pool which does not pool connections,
    instead it literally opens and closes the underlying DB-API connection per each connection open/close.
    Reconnect-related functions such as recycle and
    connection invalidation are not supported by this Pool implementation,
    since no connections are held persistently.
"""

conn_engine = create_engine(repo_db)

try:
    rating = sessionmaker(bind=conn_engine)
    log.info("created connections {},".format(rating))
    repo_session = rating()
    # suppose the database has been restarted.
    repo_session.commit()
    repo_session.close()

except Exception as e:
    print('DB trying to reconnect')
    connect = sessionmaker(bind=conn_engine)
    log.info("creted connections except {},".format(connect))
    repo_session = rating()
