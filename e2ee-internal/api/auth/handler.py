from datetime import datetime, timedelta, timezone

import jwt
from fastapi.security import HTTPBearer
from passlib.context import CryptContext

class AuthHandler:
    security = HTTPBearer()
    pwd_ctx = CryptContext(schemes=["bcrypt"])
    hmac_sha256 = "HS256"
    secret = ""

    def __init__(self, secret: str):
        self.secret = secret
        pass

    def hash_password(self, password: str) -> str:
        return self.pwd_ctx.hash(password)
    
    def encode_token(self, user_id):
        payload = {
            "exp": datetime.now(timezone.utc) + timedelta(hours=9),
            "iat": datetime.now(timezone.utc),
            "sub": user_id            
        }
        return jwt.encode(payload, self.secret, algorithm=self.hmac_sha256)

