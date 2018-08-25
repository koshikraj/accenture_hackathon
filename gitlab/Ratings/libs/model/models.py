from datetime import datetime
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from config import repo_db

Base = declarative_base()


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    email = Column(String(255), unique=True)
    name = Column(String(255), nullable=False)
    public_address = Column(String(255))

    photo = Column(String(155))

    ratings = relationship("Ratings", back_populates="user")


class Repository(Base):
    __tablename__ = 'repository'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), unique=True)


class Ratings(Base):
    __tablename__ = 'ratings'
    id = Column(Integer, primary_key=True)
    rating = Column(Integer)
    votes = Column(Integer)
    user_id = Column(Integer, ForeignKey('user.id'))
    repo_id = Column(Integer)

    user = relationship("User", back_populates="ratings")

    def __init__(self, user_id, repo_id):
        self.user_id = user_id
        self.repo_id = repo_id


engine = create_engine(repo_db)
Base.metadata.create_all(engine)
