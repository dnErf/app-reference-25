from fastapi import APIRouter, Depends
from pydantic import BaseModel

from .handler import AuthHandler

auth_route = APIRouter()
auth_handler = AuthHandler("")

class AuthPayload(BaseModel):
    email: str
    password: str

@auth_route.post("/api/auth/signin")
def signin(payload: AuthPayload):
    token = auth_handler.encode_token(payload.email)
    return token 

@auth_route.get("/api/auth/user")
def signed_user(bear = Depends(auth_handler.decode_token)):
    return bear
