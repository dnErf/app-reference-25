from contextlib import asynccontextmanager
from fastapi import FastAPI

import asyncio
import redis.asyncio as redis

from api.auth.route import auth_route

red = redis.from_url('redis://172.30.55.194:6379', protocol=3)
stream_name = "streaming"
async def consume_async():
    last_id = '$'
    while True:
        mp = await red.xread({stream_name: last_id}, block=1000, count=1)

        if not mp:
            continue

        for m in mp[b'streaming']:
            for i, d in m:
                last_id = i.decode('utf-8')
                dm = d[b'message'].decode('utf-8')
                print(dm)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # loop = asyncio.get_event_loop()
    # loop.create_task(consume_async())
    yield
    

app = FastAPI(lifespan=lifespan)
app.include_router(auth_route)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)
    
