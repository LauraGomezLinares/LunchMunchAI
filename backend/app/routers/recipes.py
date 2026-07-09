from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID
from app.services.azure_ai import generate_recipe_with_agent

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

@router.get("/{receta_id}/nutrition")
async def get_recipe_nutrition(receta_id: str):
    """
    Retorna la información nutricional desglosada para una receta específica (FEAT-05).
    """
    # En producción esto consulta la base de datos o recupera la información calculada en FEAT-03
    return {
        "receta_id": receta_id,
        "calorias": 350,
        "proteinas_g": 25,
        "carbohidratos_g": 45,
        "grasas_g": 10
    }
