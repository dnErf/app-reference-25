import os
from sqlmodel import SQLModel, Session, create_engine

DB = os.environ.get("DATABASE_URL")
if DB == "":
    raise NotImplementedError("invalid database url")

engine = create_engine(DB, timezone="UTC")

def init_db():
    SQLModel.metadata.create_all(engine)

def dal_session():
    with Session(engine) as session:
        yield session
