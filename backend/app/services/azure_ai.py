from typing import List, Dict, Any
from uuid import UUID
from app.core.config import settings

# Comentario de Estructuración:
# Servicio de Inteligencia Artificial encapsulando llamadas al SDK azure-ai-projects.
# En una fase posterior, aquí se inicializará el AIProjectClient con las credenciales de Azure,
# y se gestionará la inyección de restricciones (alergias) en el System Prompt, la búsqueda semántica
# en el índice de Azure AI Search (RAG) y la interacción asíncrona con el Agent.

async def generate_recipe_with_agent(usuario_id: UUID, ingredientes: List[str]) -> Dict[str, Any]:
    """
    Ejecuta el pipeline híbrido de recetas:
    1. Simula el filtrado de alérgenos (ej: si el usuario tiene alergia al maní, se excluye proactivamente).
    2. Ejecuta la búsqueda semántica RAG (simulada aquí, llamando a Azure AI Search en el futuro).
    3. Genera la receta usando gpt-4o-mini mediante Azure AI Agent Service.
    """
    # Restricciones dietarias del usuario (debería leerse del DB usando usuario_id)
    # Por ahora definimos una advertencia simulada si se detectan ingredientes conflictivos
    advertencias = []
    
    # Simulación simple de RAG y generación
    receta_markdown = (
        f"# Bowl de Quinoa y Vegetales al vapor\n\n"
        f"Una receta rápida aprovechando tus insumos: {', '.join(ingredientes)}.\n\n"
        f"### Instrucciones:\n"
        f"1. Cocina la quinoa con agua y una pizca de sal.\n"
        f"2. Corta los vegetales disponibles y saltéalos con unas gotas de limón.\n"
        f"3. Mezcla todo en un tazón y sirve caliente."
    )
    
    return {
        "receta": receta_markdown,
        "ingredientes_utilizados": ingredientes,
        "ingredientes_faltantes": ["aceite de oliva", "semillas de sésamo"],
        "informacion_nutricional": {
            "calorias": 280,
            "proteinas_g": 8,
            "carbohidratos_g": 42,
            "grasas_g": 6
        },
        "advertencias_alergias": advertencias
    }
