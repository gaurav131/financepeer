from sqlalchemy import Column, ForeignKey, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()


class User(Base):
    __tablename__ = 'user'
    name = Column(String(100), nullable=False)
    email = Column(String(100), primary_key=True)
    password = Column(String(100), nullable=False)

    def __repr__(self):
        return f"name: {self.name}"


class UserData(Base):
    __tablename__ = "userData"
    id = Column(Integer, primary_key=True)
    userId = Column(Integer, nullable=False)
    title = Column(String, nullable=False)
    body = Column(String, nullable=False)
    email = Column(String, ForeignKey("user.email"))
    user = relationship(User, lazy='subquery')

    @property
    def serialize(self):
        return {'id': self.id, "userId": self.userId, "title": self.title, "body": self.body}

    def __repr__(self):
        return f"title: {self.title}"


engine = create_engine('sqlite:///data.db')
Base.metadata.create_all(engine)
