from beanie import init_beanie

from .client import client
from .passkey import Passkey
from .user import User
from .session import Session


async def connect():
    await init_beanie(client['kewldan'], document_models=[
        User,
        Session,
        Passkey
    ])
