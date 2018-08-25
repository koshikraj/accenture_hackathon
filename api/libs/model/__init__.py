from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config import repo_db

conn_engine = create_engine(repo_db)

try:
    rating = sessionmaker(bind=conn_engine)
    repo_session = rating()
    # suppose the database has been restarted.
    repo_session.commit()
    repo_session.close()

except Exception as e:
    print('DB trying to reconnect')
    connect = sessionmaker(bind=conn_engine)
    repo_session = rating()
