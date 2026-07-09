from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers import auth, pantry, recipes, markets
from app.db.session import init_db

# Inicializar la aplicación FastAPI
app = FastAPI(
    title=settings.APP_NAME,
    description="Backend asíncrono para LunchMunchAI - Orquestación de recetas y geolocalización.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configurar políticas CORS para permitir comunicación con React Native
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción, limitar a dominios específicos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Evento de inicio del servidor: Inicializa tablas si se usa base de datos embebida
@app.on_event("startup")
def on_startup():
    init_db()

# Incluir los enrutadores de los diferentes módulos
app.include_router(auth.router)
app.include_router(pantry.router)
app.include_router(recipes.router)
app.include_router(markets.router)

@app.get("/")
def read_root():
    """
    Ruta raíz para verificación rápida de salud del servicio (Healthcheck).
    """
    return {
        "status": "online",
        "project": settings.APP_NAME,
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    # Inicia uvicorn en el puerto y host definidos en la configuración
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )
