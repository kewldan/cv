import asyncio
import logging
import os
from contextlib import suppress

import uvicorn

import database
from config import config


async def main():
    await database.connect()

    server_config = uvicorn.Config(
        "server:app",
        host="0.0.0.0",
        port=config.server_port,
        use_colors=True,
        log_level="info",
        server_header=False,
    )
    server = uvicorn.Server(server_config)

    await server.serve()

if __name__ == '__main__':
    logging.getLogger("pymongo").setLevel(logging.WARNING)
    logging.basicConfig(level=logging.DEBUG if config.debug else logging.WARNING)
    os.makedirs('data', exist_ok=True)

    with suppress(KeyboardInterrupt):
        asyncio.run(main())
