from fastapi import APIRouter
from pydantic import BaseModel

from .handler import AuthHandler

auth_route = APIRouter()
auth_handler = AuthHandler("")

class AuthPayload(BaseModel):
    email: str
    password: str


@auth_route.post("/api/auth/signin")
def signin(payload: AuthPayload):
    print(payload)
    print("hello world")
    token = auth_handler.encode_token(payload.email) 
    return { "token": token }

@auth_route.get("/api/auth/signin")
def sign():
    return { "hello": "world" }
