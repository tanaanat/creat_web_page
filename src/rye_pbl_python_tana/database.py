from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from models import User

# 接続先DBの設定
DATABASE = 'postgresql+psycopg://user:postgres@localhost:5432/postgres'

# Engine の作成
Engine = create_engine(
  DATABASE,
  echo=False
)

# Sessionの作成
session = Session(
  autocommit = False,
  autoflush = True,
  bind = Engine
)



def read_table():
    return session.query(User).all()

def read_id(id):
    return session.query(User).filter(User.id==id).first