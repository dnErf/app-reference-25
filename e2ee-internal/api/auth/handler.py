from datetime import datetime, timedelta, timezone

import jwt
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext

class AuthHandler:
    security = OAuth2PasswordBearer(tokenUrl="/api/signin")
    pwd_ctx = CryptContext(schemes=["bcrypt"])
    hmac_sha256 = "HS256"
    secret = ""

    def __init__(_, secret: str):
        _.secret = secret
    
    def verify_password(_, plain, hashed):
        return _.pwd_ctx.verify(plain, hashed)

    def hash_password(_, password: str) -> str:
        return _.pwd_ctx.hash(password)
    
    def encode_token(_, user):
        iat = datetime.now(timezone.utc)
        expire_at = iat + timedelta(hours=9)
        token = {
            "exp": expire_at,
            "iat": iat,
            "sub": user            
        }
        payload = {
            "token": jwt.encode(token, _.secret, algorithm=_.hmac_sha256),
            "expire_at": str(expire_at),
        }
        return payload

    def decode_token(_, token: str = Depends(security)):
        decoded = jwt.decode(token, _.secret, algorithms=_.hmac_sha256)
        return decoded 
