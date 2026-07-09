from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.user import User, UserCreate, UserResponse
import uuid

router = APIRouter(prefix="/auth", tags=["Autenticación"])

# Comentario de Estructuración:
# Este router maneja el flujo de registro e inicio de sesión. 
# De acuerdo con SYSTEM_ARCHITECTURE.md, se prevé el uso de Azure Entra ID (B2C) para la validación del JWT de usuario.
# Como el frontend enviará el token Bearer en el header de autorización, aquí implementamos el esqueleto para
# registrar usuarios localmente de forma provisional para desarrollo rápido.

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_218_CREATED if hasattr(status, 'HTTP_218_CREATED') else 201)
async def register(user_data: UserCreate, session: Session = Depends(get_session)):
    """
    Registra un nuevo usuario con sus restricciones/alergias iniciales.
    """
    # Verificar si el usuario ya existe por email
    statement = select(User).where(User.email == user_data.email)
    existing_user = session.exec(statement).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
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

@router.post("/login")
async def login():
    """
    Esqueleto para simulación o integración de Login.
    En producción, el inicio de sesión se delega a Azure Entra ID B2C y se devuelve un JWT.
    """
    return {"message": "Inicio de sesión delegado a Azure Entra ID (B2C). Devuelve un Bearer JWT en producción."}
