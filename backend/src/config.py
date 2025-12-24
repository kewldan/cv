from utils.base_config import BaseConfig


class Config(BaseConfig):
    debug: bool = False
    server_port: int = 8080
    database_url: str = ''


config = Config()
