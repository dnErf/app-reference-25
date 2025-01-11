from pydantic_settings import BaseSettings, SettingsConfigDict

class Config(BaseSettings):
    """
    """
    DB_PATH: str
    MEMORY_DB: str
    AUTH_SECRET: str
    E2EE_SERVER: str
    model_config = SettingsConfigDict(env_file=".env")
    
cfg = Config()
