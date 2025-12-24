from pymongo import AsyncMongoClient

from config import config

client = AsyncMongoClient(config.database_url)
