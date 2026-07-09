from typing import Optional
from uuid import UUID, uuid4
from datetime import date
from sqlmodel import SQLModel, Field, Relationship

class PantryItemBase(SQLModel):
    ingrediente: str
    cantidad: float
    unidad: str
    fecha_caducidad: Optional[date] = None

class PantryItem(PantryItemBase, table=True):
    """
    Modelo de Base de Datos para los ingredientes en la despensa de un usuario.
    """
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    usuario_id: UUID = Field(foreign_key="user.id", index=True)
    
    # Relación inversa con el modelo de Usuario
    usuario: Optional["User"] = Relationship(back_populates="pantry_items")

class PantryItemCreate(PantryItemBase):
    pass

class PantryItemUpdate(SQLModel):
    ingrediente: Optional[str] = None
    cantidad: Optional[float] = None
    unidad: Optional[str] = None
    fecha_caducidad: Optional[date] = None
