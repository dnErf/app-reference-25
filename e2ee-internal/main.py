import asyncio
import redis.asyncio as redis

async def pubsub_reader(chn: redis.client.PubSub):
    while True:
        msg = await chn.get_message(ignore_subscribe_messages=True, timeout=None)

        if msg is None: 
            continue

        print(f'{type(msg['data'])}')
        if isinstance(msg['data'], bytes) and msg['data'].decode() == 'STOP':
            break

        print(f'message received: {msg}')

async def main():
    red = redis.from_url('redis://172.30.55.194:6379')
    async with red.pubsub() as pubsub:
        await pubsub.subscribe('zchn_test')
        future = asyncio.create_task(pubsub_reader(pubsub))
        await future

if __name__ == "__main__":
    asyncio.run(main())
