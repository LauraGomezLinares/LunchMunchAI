from fastapi import Header, HTTPException, Security, status
from app.core.config import settings

async def verify_api_key(x_api_key: str = Header(..., alias="X-API-KEY")):
    """
    Verifica que la petición incluya un encabezado X-API-KEY válido.
    Permite autenticar al agente externo de Azure AI Foundry.
    """
    if x_api_key != settings.AZURE_AGENT_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Clave de API inválida o no proporcionada en el header X-API-KEY."
        )
    return x_api_key
