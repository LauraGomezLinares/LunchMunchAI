from typing import List, Optional
from uuid import UUID, uuid4
from sqlmodel import SQLModel, Field, Relationship

class UserBase(SQLModel):
    nombre: str
    email: str = Field(unique=True, index=True)
    objetivos_nutricionales: Optional[str] = None

class User(UserBase, table=True):
    """
    Modelo de Base de Datos para el Usuario.
    """
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    hashed_password: str
    alergias: List[str] = Field(default=[], sa_column=None) # Almacenado como JSON en BD o tabla relacional
    
    # Relación uno-a-muchos con ingredientes de despensa
    pantry_items: List["PantryItem"] = Relationship(back_populates="usuario")

class UserCreate(UserBase):
    password: str
    alergias: List[str] = []

class UserResponse(SQLModel):
    usuario_id: UUID
    status: str
    perfil: dict
