from typing import List, Optional, Dict, Any
from uuid import UUID, uuid4
from sqlmodel import SQLModel, Field, Relationship, JSON

class FavoriteRecipeBase(SQLModel):
    title: str
    category: str
    time: int
    calories: int
    ingredients: List[str] = Field(default=[], sa_type=JSON)
    steps: List[str] = Field(default=[], sa_type=JSON)
    allergens: List[str] = Field(default=[], sa_type=JSON)
    nutrition: Dict[str, Any] = Field(default={}, sa_type=JSON)
    image: Optional[str] = None

class FavoriteRecipe(FavoriteRecipeBase, table=True):
    """
    Modelo de Base de Datos para las recetas guardadas como favoritas por el usuario.
    """
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    usuario_id: UUID = Field(foreign_key="user.id", index=True)
    
    # Relación inversa con el modelo de Usuario
    usuario: Optional["User"] = Relationship(back_populates="favorite_recipes")

class FavoriteRecipeCreate(FavoriteRecipeBase):
    pass
