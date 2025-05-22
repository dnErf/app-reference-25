import uuid
from datetime import datetime,timezone
from typing import Optional

from sqlmodel import SQLModel, Field as SQLField

def generate_session_id():
    return str(uuid.uuid4())

class WatchSession(SQLModel, table=False):
    watch_session_id: str = SQLField(default_factory=generate_session_id, index=True)
    video_id: Optional[str] = SQLField(default="")
    path: Optional[str] = SQLField(default="")
    referer: Optional[str] = SQLField(default="")
    last_active: Optional[datetime] = SQLField(default_factory=datetime.now(timezone.utc))

class WatchSessionNew(SQLModel, table=False):
    video_id: Optional[str] = SQLField(default="")
    path: Optional[str] = SQLField(default="")
