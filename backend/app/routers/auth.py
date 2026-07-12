from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.user import User, UserCreate, UserResponse
import uuid

from app.core.security import verify_api_key

router = APIRouter(prefix="/auth", tags=["Autenticación"])

# Comentario de Estructuración:
# Este router maneja el flujo de registro e inicio de sesión. 
# De acuerdo con SYSTEM_ARCHITECTURE.md, se prevé el uso de Azure Entra ID (B2C) para la validación del JWT de usuario.
# Como el frontend enviará el token Bearer en el header de autorización, aquí implementamos el esqueleto para
# registrar usuarios localmente de forma provisional para desarrollo rápido.

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    user_data: UserCreate, 
    session: Session = Depends(get_session)
):
    """
    Registra un nuevo usuario con sus restricciones/alergias iniciales.
    """
    # Verificar si el usuario ya existe por email (case-insensitive)
    from sqlalchemy import func
    statement = select(User).where(func.lower(User.email) == func.lower(user_data.email))
    existing_user = session.exec(statement).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="El correo electrónico ya está registrado."
        )
    
    # Crear nuevo usuario
    new_user = User(
        nombre=user_data.nombre,
        email=user_data.email,
        hashed_password=f"hash_{user_data.password}", # TODO: Implementar hashing real (bcrypt/passlib)
        alergias=user_data.alergias,
        objetivos_nutricionales=user_data.objetivos_nutricionales
    )
    
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    
    return UserResponse(
        usuario_id=new_user.id,
        status="creado",
        perfil={"alergias": new_user.alergias, "objetivos_nutricionales": new_user.objetivos_nutricionales}
    )

from app.models.auth import UserLogin

@router.post("/login")
async def login(credentials: UserLogin, session: Session = Depends(get_session)):
    """
    Inicia sesión verificando las credenciales contra la base de datos (SQLite/Azure SQL).
    Retorna un token (el ID del usuario en formato string) para persistencia.
    """
    from sqlalchemy import func
    statement = select(User).where(func.lower(User.email) == func.lower(credentials.email))
    user = session.exec(statement).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="El correo electrónico ingresado no está registrado."
        )
        
    if user.hashed_password != f"hash_{credentials.password}":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Contraseña incorrecta."
        )
        
    return {
        "token": str(user.id),
        "user": {
            "name": user.nombre,
            "email": user.email,
            "allergies": user.alergias,
            "preferences": [],
            "restrictions": []
        }
    }
