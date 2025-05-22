from datetime import datetime, timedelta, timezone
from typing import List, Optional

from fastapi import APIRouter, Request, Depends, HTTPException
from pydantic import BaseModel, Field as PydanticField
from sqlmodel import SQLModel, Session, select, Field as SQLField
from sqlalchemy import func

from api.watch_sessions import WatchSession
from api.utils import parse_int_or_fallback
from db.session import dal_session

class VideoWatchEvent(SQLModel, table=True):
    video_id: str = SQLField(index=True)
    video_title: str
    video_ready: bool
    video_state_label: str
    video_state_value: str
    current_time: float
    referer: Optional[str] = SQLField(default="", index=True)
    watch_session_id: Optional[str] = SQLField(index=True)

class VideoPlayerState(SQLModel, table=False):
    video_id: str
    video_title: str
    video_ready: bool
    video_state_label: str
    video_state_value: int
    current_time: float

class VideoWatchEventPaystub(SQLModel, table=False):
    watch_id: int = SQLField(primary_key=True)
    video_id: str = SQLField(primary_key=True)
    current_time: float
    dte: datetime

class VideoStat(BaseModel):
    video_id: str
    total_events: int
    max_viewership: Optional[float] = PydanticField(default=-1)
    avg_viewership: Optional[float] = PydanticField(default=-1)
    unique_views: Optional[int] = PydanticField(default=-1)
    dte: datetime

# ===

router = APIRouter()

@router.post("/", response_model = VideoWatchEventPaystub)
def create_video_event(request: Request, payload: VideoPlayerState, ds: Session = Depends(dal_session)):
    watch_session_id = request.headers.get("x-session-id")
    referer = request.headers.get("referer")
    data = payload.model_dump()
    o = VideoWatchEvent(**data)
    o.referer = referer
    if watch_session_id:
        session_query = select(WatchSession).where(WatchSession.watch_session_id == watch_session_id)
        session_obj = ds.exec(session_query).first()
        if session_obj:
            session_obj.last_active = datetime.now(timezone.utc)
            ds.add(session_obj)
            o.watch_session_id = watch_session_id
    ds.add(o)
    ds.commit()
    ds.refresh(o)
    return o

@router.get("/{video_id}", response_model = List[VideoStat])
def get_video_stats(video_id: str, request: Request, ds: Session = Depends(dal_session)):
    hours_ago = parse_int_or_fallback(request.query_params.get("hours-ago"), fallback = 24*31*3)
    hours_until = parse_int_or_fallback(request.query_params.get("hours-until"), fallback = 0)
    start = datetime.now(timezone.utc) - timedelta(hours=hours_ago)
    print(start)
    end = datetime.now(timezone.utc) - timedelta(hours=hours_until)
    print(end)
    query = (
        select(
            VideoWatchEvent.video_id,
            func.count().label("total_events"),
            func.max(VideoWatchEvent.current_time).label("max_viewership"),
            func.avg(VideoWatchEvent.current_time).label("avg_viewership"),
            func.count(func.distinct(VideoWatchEvent.watch_session_id)).label("unique_views")
        )
        .where(
            VideoWatchEvent.video_state_label != "CUED",
            VideoWatchEvent.video_id == video_id
        )
        .group_by(
            VideoWatchEvent.video_id
        )
    )
    try:
        results = ds.exec(query).fetchall()
    except Exception:
        raise HTTPException(status_code=400, detail="invalid query")
    results = [
        VideoStat(
            video_id = x[0],
            total_events = x[1],
            max_viewership = x[2],
            avg_viewership = x[3],
            unique_views = x[4]
        ) for x in results
    ]
    return results
