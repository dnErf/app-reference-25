from fastapi import Depends
from sqlmodel import SQLModel, Session, create_engine, select

from models.auth import AuthUser
from config import cfg

engine = create_engine(cfg.DB_PATH, echo=True)

SQLModel.metadata.create_all(engine)

def dal_session():
    with Session(engine) as dal:
        yield dal

class Dal:
    dal: Session
    
    def __init__(_, session = Depends(dal_session)):
        _.dal = session

    def commit(_):
        try:
            _.commit()
            return None
        except Exception as exc:
            print(exc)
            return exc

    def find_user_by_id(_, user_id):
        q = select(AuthUser).where(AuthUser.id == user_id)
        return _.dal.exec(q).first() 

    def find_user_by_email(_, user_email):
        q = select(AuthUser).where(AuthUser.email == user_email)
        return _.dal.exec(q).first()
    
    def add_user(_, user: AuthUser):
        _.add(user)
        err = _.commit()
        _.refresh(user)
        return (err, user)