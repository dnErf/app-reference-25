# docker compose up --watch
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

HOST = os.environ.get("HOST")
HOST_SCHEME = os.environ.get("HOST_SCHEME")
HOST_PORT = os.environ.get("HOST_PORT")

origins = [
    f"{HOST_SCHEME}://{HOST}:{HOST_PORT}",
    f"{HOST_SCHEME}://{HOST}"
]

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

app = FastAPI(lifespan = lifespan)
app.add_middleware(
    CORSMiddleware, allow_origins = origins, allow_headers = ["*"], allow_methods = ["*"]
)

@app.get("/")
def read_root():
    return {"Hello": "World my old friend"}

@app.get("/health")
def api_health():
    print("hello")
    return { "api": "ok" }
