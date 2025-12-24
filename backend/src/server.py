from fastapi import FastAPI

from config import config
from routes import main_router

app = FastAPI(debug=config.debug)

app.include_router(main_router)
