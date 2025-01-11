from fastapi import APIRouter, Depends, HTTPException, status

from config import cfg
from models.auth import AuthUser, AuthRegisterPaylod, AuthPayload
from lib.data_context import dal_session, commit, find_user_by_email
from .handler import AuthHandler

auth_route = APIRouter()
auth_handler = AuthHandler(cfg.AUTH_SECRET)

@auth_route.post("/api/auth/signin")
def signin(payload: AuthPayload, dal = Depends(dal_session)):
    user = find_user_by_email(dal, payload.email)
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    is_verified = auth_handler.verify_password(payload.password, user.hashed)
    if not is_verified:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    token = auth_handler.encode_token(user.id)
    return token 

@auth_route.get("/api/auth/user")
def signed_user(token = Depends(auth_handler.decode_token) , dal = Depends(dal_session)):
    user = auth_handler.get_auth_user(token, dal)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return user

@auth_route.post("/api/auth/register")
def register(payload: AuthRegisterPaylod, dal=Depends(dal_session)):
    # TODO 
    if payload.password != payload.password_pair:
        print("=== p not p")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    
    hashed = auth_handler.hash_password(payload.password)
    user = AuthUser(
        email = payload.email,
        user = payload.user,
        hashed = hashed,
        img_thumbnail = payload.img_thumbnail
    ) 
    dal.add(user)
    err, _ = commit(dal)
    if err:
        print("===")
        print(err)
        print("===")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    dal.refresh(user)
    token = auth_handler.encode_token(user.user)
    return token

