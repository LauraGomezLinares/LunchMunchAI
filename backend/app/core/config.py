import os
from typing import Optional
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """
    Configuración global de la aplicación cargada desde las variables de entorno.
    Utiliza Pydantic Settings para validar tipos al inicio de la aplicación.
    """
    APP_NAME: str = "LunchMunchAI Backend"
    DEBUG: bool = True
    PORT: int = 8000
    HOST: str = "0.0.0.0"

    # Base de Datos
    DATABASE_URL: Optional[str] = None

    # Autenticación (Azure Entra ID B2C)
    AZURE_TENANT_ID: Optional[str] = None
    AZURE_CLIENT_ID: Optional[str] = None
    AZURE_CLIENT_SECRET: Optional[str] = None
    AZURE_B2C_POLICY: Optional[str] = None

    # Azure AI Foundry & Agent Service
    AZURE_AI_PROJECT_CONNECTION_STRING: Optional[str] = None
    AZURE_AI_AGENT_MODEL: str = "gpt-4o-mini"
    AZURE_AI_SEARCH_ENDPOINT: Optional[str] = None
    AZURE_AI_SEARCH_KEY: Optional[str] = None

    # Azure Blob Storage
    AZURE_STORAGE_CONNECTION_STRING: Optional[str] = None
    AZURE_STORAGE_CONTAINER_NAME: str = "recipes"

    # APIs de Terceros (Google Maps)
    GOOGLE_MAPS_API_KEY: Optional[str] = None

    # Seguridad e Integración
    AZURE_AGENT_API_KEY: str = "dev-key-lunchmunch-123" # Valor por defecto seguro para desarrollo local

    # Permite cargar variables desde un archivo .env si existe
    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )

# Instancia única de la configuración para importar en todo el proyecto
settings = Settings()
