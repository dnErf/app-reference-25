from uuid import uuid4
from datetime import datetime, timezone

from pydantic import BaseModel, EmailStr
from sqlmodel import SQLModel, Field

class AuthPayload(BaseModel):
    email: str
    password: str

class AuthResponse(BaseModel):
    status_code: int
    expire_at: int
    token: str

# TODO field validator for password pair
class AuthRegisterPaylod(BaseModel):
    user: str
    email: str
    password: str
    password_pair: str
    img_thumbnail: str

class AuthUser(SQLModel, table=True):
    id: str = Field(primary_key=True, default=str(uuid4().hex))
    email: EmailStr = Field(index=True, unique=True)
    user: str = Field(unique=True)
    hashed: str
    img_thumbnail: str
    dated_at: datetime = datetime.now(timezone.utc)

    def __repr__(self) -> str:
        return f"{self.id} {self.user}"
