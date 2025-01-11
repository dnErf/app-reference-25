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

    def __init__(self, secret: str):
        self.secret = secret
        pass

    def hash_password(self, password: str) -> str:
        return self.pwd_ctx.hash(password)
    
    def encode_token(self, user):
        iat = datetime.now(timezone.utc)
        expire_at = iat + timedelta(hours=9)
        token = {
            "exp": expire_at,
            "iat": iat,
            "sub": user            
        }
        payload = {
            "token": jwt.encode(token, self.secret, algorithm=self.hmac_sha256),
            "expire_at": str(expire_at),
        }
        return payload

    def decode_token(self, token: str = Depends(security)):
        decoded = jwt.decode(token, self.secret, algorithms=self.hmac_sha256)
        return decoded
