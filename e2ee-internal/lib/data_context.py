from sqlmodel import SQLModel, Session, create_engine, select

from models.auth import AuthUser
from config import cfg

engine = create_engine(cfg.DB_PATH, echo=True)

SQLModel.metadata.create_all(engine)

def dal_session():
    with Session(engine) as dal:
        yield dal

def commit(dal: Session):
    try:
        dal.commit()
        return (None, True)
    except Exception as exc:
        print(exc)
        return (exc, False)

def find_user(dal: Session, user_id: str):
    q = select(AuthUser).where(AuthUser.id == user_id)
    return dal.exec(q).first()

def find_user_by_email(dal: Session, user_email: str):
    q = select(AuthUser).where(AuthUser.email == user_email)
    return dal.exec(q).first()


# TODO DAL class
