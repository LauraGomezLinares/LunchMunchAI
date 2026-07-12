from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID
from app.core.security import verify_jwt
from app.models.user import User
from app.models.pantry import PantryItem
from sqlmodel import Session, select
from app.db.session import get_session
from app.services.azure_ai import AzureAIService

router = APIRouter(prefix="/recipes", tags=["Recetas e Inteligencia Artificial"])

# Comentario de Estructuración:
# Este router maneja la generación de recetas personalizadas utilizando el motor híbrido (Azure AI Foundry + RAG).
# También maneja la obtención de información nutricional específica.

class RecipeRequest(BaseModel):
    usuario_id: UUID
    ingredientes_disponibles: List[str]

class RecipeResponse(BaseModel):
    receta: str
    ingredientes_utilizados: List[str]
    ingredientes_faltantes: List[str]
    informacion_nutricional: dict
    advertencias_alergias: List[str]

@router.get("/recommend")
async def recommend_recipes(
    session: Session = Depends(get_session),
    current_user: User = Depends(verify_jwt)
):
    """
    Motor híbrido de recomendación (FEAT-03):
    1. Lee los ingredientes de la despensa real de la base de datos del usuario autenticado.
    2. Lee las alergias registradas en su perfil.
    3. Pide las recetas dinámicas al servicio AzureAIService (directamente integrado con la SDK de Azure Foundry).
    """
    # 1. Recuperar despensa física del usuario
    statement = select(PantryItem).where(PantryItem.usuario_id == current_user.id)
    pantry_items = session.exec(statement).all()
    
    # Validación de Vacíos
    if not pantry_items:
        return [{
            "id": "empty-pantry",
            "title": "Despensa vacía",
            "category": "Snack",
            "time": 0,
            "calories": 0,
            "ingredients": [],
            "steps": ["Agrega ingredientes a tu despensa para comenzar a cocinar."],
            "allergens": [],
            "nutrition": {"protein": 0, "carbs": 0, "fat": 0},
            "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500"
        }]

    # 2. Filtrado proactivo de alérgenos:
    # Excluye cualquier ingrediente de la despensa que coincida con la lista de alergias del usuario.
    allergens_lower = [a.lower() for a in current_user.alergias]
    ingredients_list = [
        item.ingrediente 
        for item in pantry_items 
        if item.ingrediente.lower() not in allergens_lower
    ]
    
    # Validación post-filtrado de alérgenos
    if not ingredients_list:
        return [{
            "id": "empty-pantry-allergen",
            "title": "Ingredientes no aptos",
            "category": "Snack",
            "time": 0,
            "calories": 0,
            "ingredients": [],
            "steps": ["Todos los ingredientes agregados coinciden con tus alergias registradas. Modifica tu despensa."],
            "allergens": current_user.alergias,
            "nutrition": {"protein": 0, "carbs": 0, "fat": 0},
            "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500"
        }]

    # 3. Consultar servicio de Azure AI Foundry
    recommendations = await AzureAIService.get_recipe_recommendations(
        ingredients=ingredients_list,
        allergies=current_user.alergias
    )
    return recommendations

# Remoción del mock estático previo

@router.post("/suggest", response_model=RecipeResponse)
async def suggest_recipe(payload: RecipeRequest):
    """
    Motor híbrido de recomendación (FEAT-03):
    1. Filtra por alergias recuperadas desde el perfil del usuario.
    2. Realiza búsqueda semántica RAG sobre Azure AI Search.
    3. Envía el contexto limpio al Agent Service (Azure AI Foundry) para retornar la receta estructurada en Markdown/JSON.
    """
    try:
        # Llamar al servicio wrapper de Azure AI que interactúa con el SDK
        result = await generate_recipe_with_agent(
            usuario_id=payload.usuario_id,
            ingredientes=payload.ingredientes_disponibles
        )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error en el motor híbrido de recetas: {str(e)}"
        )

from app.models.recipe import FavoriteRecipe

@router.post("/favorites")
async def save_favorite_recipe(
    recipe: FavoriteRecipe,
    session: Session = Depends(get_session),
    current_user: User = Depends(verify_jwt)
):
    """
    Guarda una receta en el historial de favoritos de la base de datos de Luis.
    """
    # Sobrescribimos el usuario_id con el del token autenticado por seguridad
    recipe.usuario_id = current_user.id
    session.add(recipe)
    session.commit()
    session.refresh(recipe)
    return recipe

@router.get("/favorites")
async def list_favorite_recipes(
    session: Session = Depends(get_session),
    current_user: User = Depends(verify_jwt)
):
    """
    Obtiene todas las recetas guardadas en favoritos por el usuario actual.
    """
    statement = select(FavoriteRecipe).where(FavoriteRecipe.usuario_id == current_user.id)
    favorites = session.exec(statement).all()
    return favorites

@router.delete("/favorites/{recipe_id}")
async def delete_favorite_recipe(
    recipe_id: UUID,
    session: Session = Depends(get_session),
    current_user: User = Depends(verify_jwt)
):
    """
    Elimina una receta del historial de favoritos de Luis.
    """
    statement = select(FavoriteRecipe).where(
        FavoriteRecipe.id == recipe_id, 
        FavoriteRecipe.usuario_id == current_user.id
    )
    recipe = session.exec(statement).first()
    if not recipe:
        raise HTTPException(status_code=404, detail="Receta favorita no encontrada")
    session.delete(recipe)
    session.commit()
    return {"status": "success", "message": "Receta eliminada de favoritos"}

