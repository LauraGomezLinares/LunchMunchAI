from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List
from uuid import UUID
from app.db.session import get_session
from app.models.pantry import PantryItem, PantryItemCreate, PantryItemUpdate

router = APIRouter(prefix="/pantry", tags=["Inventario Despensa"])

# Comentario de Estructuración:
# Este router maneja el CRUD completo de ingredientes de despensa para cada usuario.
# Todos los endpoints son asíncronos y consumen la sesión asíncrona de base de datos relacional (Azure SQL / SQLite).

@router.post("/", response_model=PantryItem, status_code=status.HTTP_201_CREATED)
async def create_pantry_item(
    usuario_id: UUID, 
    item_data: PantryItemCreate, 
    session: Session = Depends(get_session)
):
    """
    Agrega un nuevo ingrediente al inventario de despensa del usuario.
    """
    new_item = PantryItem(
        usuario_id=usuario_id,
        **item_data.model_dump()
    )
    session.add(new_item)
    session.commit()
    session.refresh(new_item)
    return new_item

@router.get("/{usuario_id}", response_model=List[PantryItem])
async def list_pantry_items(usuario_id: UUID, session: Session = Depends(get_session)):
    """
    Obtiene la lista completa de ingredientes del inventario de despensa de un usuario.
    """
    statement = select(PantryItem).where(PantryItem.usuario_id == usuario_id)
    items = session.exec(statement).all()
    return items

@router.put("/{item_id}", response_model=PantryItem)
async def update_pantry_item(
    item_id: UUID, 
    item_update: PantryItemUpdate, 
    session: Session = Depends(get_session)
):
    """
    Actualiza la cantidad, unidad, fecha de caducidad o nombre de un ingrediente en la despensa.
    """
    db_item = session.get(PantryItem, item_id)
    if not db_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ingrediente no encontrado")
    
    update_data = item_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_item, key, value)
        
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item

@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_pantry_item(item_id: UUID, session: Session = Depends(get_session)):
    """
    Elimina un ingrediente de la despensa del usuario.
    """
    db_item = session.get(PantryItem, item_id)
    if not db_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ingrediente no encontrado")
    session.delete(db_item)
    session.commit()
    return None
