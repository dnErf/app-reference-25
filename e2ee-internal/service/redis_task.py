import redis.asyncio as redis_async

from config import cfg

redis = redis_async.from_url(cfg.REDIS_SERVER, protocol = 1)

async def consume_action_async():
    last_id = "$"
    stream_name = "LOG_ACTION"

    while True:
        xr = await redis.xread({ stream_name: last_id }, block = 1000, count = 1)

        if not xr:
            continue

        for x in xr[b"LOG_ACTION"]:
            for idx, y in x:
                last_id = idx.decode("utf-8")
                subject = y[b"subject"].decode("utf-8")
                print(subject)
                action = y[b"action"].decode("utf-8")
                print(action)
