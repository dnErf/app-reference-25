from fastapi import APIRouter, Depends, HTTPException, status

from config import cfg
from models.auth import AuthUser, AuthRegisterPaylod, AuthPayload
from lib.data_context import Dal
from .handler import AuthHandler

auth_route = APIRouter()
auth_handler = AuthHandler(cfg.AUTH_SECRET)

@auth_route.post("/api/auth/signin")
def signin(payload: AuthPayload, dal = Depends(Dal)):
    user = dal.find_user_by_email(payload.email)
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    is_verified = auth_handler.verify_password(payload.password, user.hashed)
    if not is_verified:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    token = auth_handler.encode_token(user.id)
    return token 

@auth_route.get("/api/auth/user")
def signed_user(token = Depends(auth_handler.decode_token) , dal = Depends(Dal)):
    user = dal.find_user_by_id(token["sub"])
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return user

@auth_route.post("/api/auth/register")
def register(payload: AuthRegisterPaylod, dal=Depends(Dal)):
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
    err, _ = dal.add_user(user)
    if err:
        print("===")
        print(err)
        print("===")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    print(user)
    token = auth_handler.encode_token(user.user)
    return token

