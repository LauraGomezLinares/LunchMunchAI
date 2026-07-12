from fastapi import Header, HTTPException, Security, status
from app.core.config import settings
from sqlmodel import Session, select
from app.db.session import get_session
from fastapi import Depends
from app.models.user import User

from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security_scheme = HTTPBearer()

async def verify_jwt(
    credentials: HTTPAuthorizationCredentials = Depends(security_scheme),
    session: Session = Depends(get_session)
):
    """
    Dependency to parse and validate the User JWT/ID.
    For MVP local testing, the token is expected to be the User's UUID string.
    We check the database to confirm the user exists.
    """
    token = credentials.credentials
    try:
        from uuid import UUID
        user_id = UUID(token)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Formato de token de usuario inválido. Debe ser un UUID válido."
        )

    statement = select(User).where(User.id == user_id)
    user = session.exec(statement).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario no registrado o sesión no válida."
        )
    return user

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
