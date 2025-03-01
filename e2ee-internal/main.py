from contextlib import asynccontextmanager
from fastapi import FastAPI

# import asyncio
# import redis.asyncio as redis

# from service.redis_task import consume_action_async
from api.auth.route import auth_route

@asynccontextmanager
async def lifespan(app: FastAPI):
    # loop = asyncio.get_event_loop()
    # loop.create_task(consume_action_async())
    yield
    

app = FastAPI(lifespan=lifespan)
app.include_router(auth_route)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)
    # uvicorn main:app --host 0.0.0.0 --port 8080 --workers 4
    # fastapi run workers 4 main.py
