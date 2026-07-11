from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import List
from uuid import UUID
from app.services.google_maps import get_nearby_markets_and_route

router = APIRouter(prefix="/markets", tags=["Geolocalización de Mercados"])

# Comentario de Estructuración:
# Este router consume servicios de geolocalización (Google Maps Places y Geocoding)
# para buscar los ingredientes que faltan y trazar la ruta óptima para el usuario.

class Location(BaseModel):
    lat: float
    lng: float

class MarketRequest(BaseModel):
    usuario_id: UUID
    ubicacion_actual: Location
    ingredientes_faltantes: List[str]

class MarketInfo(BaseModel):
    nombre: str
    direccion: str
    distancia_m: int
    lat: float
    lng: float

class MarketResponse(BaseModel):
    mercados_cercanos: List[MarketInfo]
    ruta_sugerida: dict

@router.post("/nearby", response_model=MarketResponse)
async def find_nearby_markets(payload: MarketRequest):
    """
    Geolocalización de mercados y trazado de rutas (FEAT-04):
    Consulta Google Maps Places API en un radio de 500m-1000m buscando mercados y supermercados
    cercanos que puedan tener los insumos faltantes.
    """
    try:
        results = await get_nearby_markets_and_route(
            lat=payload.ubicacion_actual.lat,
            lng=payload.ubicacion_actual.lng,
            faltantes=payload.ingredientes_faltantes
        )
        return results
    except Exception as e:
        # Fallback / Degradación elegante en caso de fallo de API externa
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Fallo en la comunicación con APIs de Google Maps: {str(e)}"
        )
