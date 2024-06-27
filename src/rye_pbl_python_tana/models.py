from sqlalchemy import Column, Integer, String#, Float, DateTime

from sqlalchemy.orm import DeclarativeBase

   #base
class Base(DeclarativeBase):
     pass

class User(Base):
    __tablename__ = 'iyatomi_lab'

    id = Column('id', Integer, primary_key=True)
    name = Column('name', String(10))
    age = Column('age', String(10))