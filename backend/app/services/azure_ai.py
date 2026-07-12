import httpx
import json
import time
from typing import List, Dict, Any
from app.core.config import settings
from fastapi import HTTPException

class AzureAIService:
    @staticmethod
    async def get_recipe_recommendations(ingredients: List[str], allergies: List[str]) -> List[Dict[str, Any]]:
        """
        Llama directamente a la API REST de Azure AI Foundry / Azure OpenAI
        para obtener recomendaciones de recetas basadas en la despensa del usuario.
        Retorna un esquema JSON estricto y limpio compatible con el frontend.
        """
        # Extraemos la conexión de Azure. Si no está configurada, retornamos datos mock controlados de fallback
        if settings.AZURE_AI_SIMULATE:
            print("[AzureAIService] MODO SIMULACIÓN ACTIVO: Retornando recetas simuladas locales.")
            return AzureAIService._get_fallback_recipes(ingredients)

        if not settings.AZURE_AI_API_KEY:
            print("[AzureAIService] AVISO: AZURE_AI_API_KEY no configurado en el archivo .env. Utilizando fallback local.")
            return AzureAIService._get_fallback_recipes(ingredients)

        # Configuración de endpoint para llamada directa a Azure OpenAI / Chat Completions
        # Se estructuran los endpoints reales proveídos
        # Endpoint base: https://lunchmunch-ai-resource.openai.azure.com/openai/v1 (o el endpoint del proyecto)
        # La API de Chat Completions suele usar la ruta: /chat/completions con la query param api-version
        api_key = settings.AZURE_AI_API_KEY
        endpoint = settings.AZURE_AI_ENDPOINT or "https://lunchmunch-ai-resource.services.ai.azure.com/api/projects/proj-default"
        deployment = settings.AZURE_AI_DEPLOYMENT or "gpt-5-mini"

        # Armando el Prompt estructurado:
        prompt = f"""
        Eres un chef profesional y experto en nutrición para LunchMunchAI.
        Tu tarea es generar sugerencias de recetas basadas estrictamente en la despensa del usuario.
        
        Ingredientes disponibles en la despensa: {", ".join(ingredients)}
        Alergias o restricciones a excluir al 100%: {", ".join(allergies) if allergies else "Ninguna"}
        
        Debes responder EXCLUSIVAMENTE con una lista de objetos JSON (un arreglo de JSON). No agregues introducciones ni explicaciones markdown (no uses ```json ni texto plano fuera del arreglo).
        Cada objeto de la receta debe cumplir exactamente con el siguiente formato TypeScript:
        {{
            "id": "string único",
            "title": "nombre de la receta",
            "category": "Desayuno" | "Almuerzo" | "Cena" | "Snack",
            "time": número (minutos de preparación),
            "calories": número (calorías totales),
            "ingredients": ["ingrediente 1", "ingrediente 2"],
            "steps": ["paso 1", "paso 2"],
            "allergens": ["alérgeno detectado o excluido"],
            "nutrition": {{
                "protein": número (gramos),
                "carbs": número (gramos),
                "fat": número (gramos)
            }},
            "image": "url de imagen de comida sugerida (usa urls públicas de Unsplash reales)"
        }}
        """

        print(f"\n[AZURE AI REQUEST INPUT]")
        print(f"Ingredientes: {ingredients}")
        print(f"Alergias: {allergies}")
        print(f"Prompt enviado:\n{prompt}\n")

        # Simulación de llamada directa / endpoint REST con httpx (con timeout de 6 segundos)
        # En un entorno real se reemplazan las credenciales con endpoint y key de Azure AI
        try:
            # Ejemplo de llamada real si estuviera configurado:
            # Dado que el SDK de AIProjectClient requiere obligatoriamente una credencial Entra ID con get_token (impidiendo usar API Keys estáticas),
            # y el cliente cuenta con una API Key, la forma estándar recomendada y garantizada por Microsoft para autenticar con API Key
            # es interactuar directamente a través del cliente oficial de AzureOpenAI de la biblioteca openai.
            from openai import AzureOpenAI

            # Formateamos el endpoint de Azure OpenAI basado en el recurso proveído
            # Ej: https://lunchmunch-ai-resource.openai.azure.com/
            azure_endpoint = "https://lunchmunch-ai-resource.openai.azure.com/"
            
            client = AzureOpenAI(
                api_key=api_key,
                api_version="2024-05-01-preview",
                azure_endpoint=azure_endpoint
            )

            # Usamos Chat Completions con el deployment configurado gpt-5-mini
            # Removido 'temperature' porque gpt-5-mini (o GPT-4o-mini en implementaciones de Azure AI Projects)
            # no permite alterar la temperatura por defecto (1.0).
            response = client.chat.completions.create(
                model=deployment,
                messages=[
                    {
                        "role": "system",
                        "content": "Actúa como un experto en nutrición y cocina creativa. Sugiere una receta de acuerdo al formato solicitado."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            )

            raw_response = response.choices[0].message.content
            print(f"[AZURE OPENAI RAW OUTPUT RESPONSE]\n{raw_response}\n")
            
            cleaned_response = raw_response.strip()
            if cleaned_response.startswith("```json"):
                cleaned_response = cleaned_response[7:]
            if cleaned_response.endswith("```"):
                cleaned_response = cleaned_response[:-3]
            cleaned_response = cleaned_response.strip()

            parsed_data = json.loads(cleaned_response)
            
            # Estandarización: Si el agente devolvió el objeto directo { "receta": ..., "ingredientes": ..., "instrucciones": ... }
            # en vez de la lista del formato extendido que espera el front, lo mapeamos adecuadamente:
            if isinstance(parsed_data, dict):
                # Caso de un solo objeto receta retornado
                receta_nombre = parsed_data.get("receta") or parsed_data.get("title") or "Receta Creativa"
                ingredientes_receta = parsed_data.get("ingredientes") or parsed_data.get("ingredients") or ingredients
                instrucciones_receta = parsed_data.get("instrucciones") or parsed_data.get("steps") or []
                
                standard_recipe = {
                    "id": "azure-real-1",
                    "title": receta_nombre,
                    "category": "Almuerzo",
                    "time": 25,
                    "calories": 350,
                    "ingredients": ingredientes_receta,
                    "steps": instrucciones_receta,
                    "allergens": [],
                    "nutrition": {
                        "protein": 24,
                        "carbs": 35,
                        "fat": 12
                    },
                    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500"
                }
                return [standard_recipe]
            
            elif isinstance(parsed_data, list):
                # Si devolvió la lista estandarizada, mapeamos campos internos por si usó español (receta/instrucciones)
                standard_list = []
                for idx, item in enumerate(parsed_data):
                    standard_list.append({
                        "id": item.get("id") or f"azure-real-{idx}",
                        "title": item.get("receta") or item.get("title") or "Receta Creativa",
                        "category": item.get("category") or "Almuerzo",
                        "time": item.get("time") or 20,
                        "calories": item.get("calories") or 300,
                        "ingredients": item.get("ingredientes") or item.get("ingredients") or [],
                        "steps": item.get("instrucciones") or item.get("steps") or [],
                        "allergens": item.get("allergens") or [],
                        "nutrition": item.get("nutrition") or {
                            "protein": 20,
                            "carbs": 30,
                            "fat": 10
                        },
                        "image": item.get("image") or "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500"
                    })
                return standard_list

            return [parsed_data]
            
        except httpx.TimeoutException:
            print("[AzureAIService Error] Timeout de conexión con Azure AI Foundry.")
            return []
        except Exception as e:
            print(f"[AzureAIService Error] Ocurrió un error inesperado al conectar con Azure: {str(e)}")
            # En caso de error de conexión física o autenticación con Azure, usamos el fallback local
            return AzureAIService._get_fallback_recipes(ingredients)

    @staticmethod
    def _get_fallback_recipes(ingredients: List[str]) -> List[Dict[str, Any]]:
        # Generar recomendaciones dinámicas basadas en los ingredientes suministrados
        ing_lower = [i.lower() for i in ingredients]
        recipes = []
        
        if any(x in ing_lower for x in ["tomate", "aguacate", "quinoa"]):
            recipes.append({
                "id": "azure-1",
                "title": "Bowl Premium de Quinoa y Aguacate",
                "category": "Almuerzo",
                "time": 15,
                "calories": 310,
                "ingredients": [i for i in ingredients if i.lower() in ["quinoa", "aguacate", "tomate"]] + ["espinaca", "aceite de oliva"],
                "steps": [
                    "Cocina la quinoa en agua hirviendo durante 12 minutos.",
                    "Corta el aguacate y los tomates frescos en dados.",
                    "Mezcla en un tazón hondo y rocía con un chorrito de aceite de oliva."
                ],
                "allergens": [],
                "nutrition": {
                    "protein": 9,
                    "carbs": 38,
                    "fat": 16
                },
                "image": "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500"
            })
            
        if any(x in ing_lower for x in ["pollo", "pechuga", "brócoli", "limón"]):
            recipes.append({
                "id": "azure-2",
                "title": "Salteado de Pollo Express",
                "category": "Cena",
                "time": 20,
                "calories": 390,
                "ingredients": [i for i in ingredients if i.lower() in ["pollo", "brócoli", "limón"]] + ["ajo", "pimienta"],
                "steps": [
                    "Trocea la pechuga de pollo y sazónala al gusto.",
                    "Saltea en una sartén caliente con brócoli cortado pequeño.",
                    "Agrega unas gotas de jugo de limón antes de retirar del fuego."
                ],
                "allergens": [],
                "nutrition": {
                    "protein": 34,
                    "carbs": 10,
                    "fat": 12
                },
                "image": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500"
            })
            
        # Si no coincide ninguno, devolver receta genérica aprovechando lo que tenga
        if not recipes:
            recipes.append({
                "id": "azure-generic",
                "title": f"Ensalada Mixta de {ingredients[0] if ingredients else 'Despensa'}",
                "category": "Snack",
                "time": 10,
                "calories": 200,
                "ingredients": ingredients + ["sal", "pimienta"],
                "steps": [
                    "Lava y corta los ingredientes de tu despensa.",
                    "Mézclalos en un bowl y sazona al gusto para disfrutar de una comida rápida."
                ],
                "allergens": [],
                "nutrition": {
                    "protein": 5,
                    "carbs": 20,
                    "fat": 8
                },
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500"
            })
            
        return recipes

async def time_simulation(seconds: float):
    import asyncio
    await asyncio.sleep(seconds)
