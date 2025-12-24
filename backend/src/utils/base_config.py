import json
from pathlib import Path

from pydantic import BaseModel

config_filename = Path('data') / 'config.json'


class BaseConfig(BaseModel):
    def __init__(self) -> None:
        config_filename.parents[0].mkdir(parents=True, exist_ok=True)

        if config_filename.exists():
            super().__init__(**json.loads(config_filename.read_text()))
        else:
            super().__init__()

        config_filename.write_text(json.dumps(self.model_dump(), ensure_ascii=True, sort_keys=True, indent=4))
