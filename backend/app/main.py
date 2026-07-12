from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers import auth, pantry, recipes, markets
from app.db.session import init_db

# 1. Instanciamos la app UNA SOLA VEZ con toda la configuración necesaria
app = FastAPI(
    title=settings.APP_NAME,
    description="Backend asíncrono para LunchMunchAI - Orquestación de recetas y geolocalización.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# 2. Configurar políticas CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware de Logging para depuración de peticiones
from fastapi import Request
import time

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    headers = dict(request.headers)
    # No imprimir contraseñas sensibles si se loguea todo
    print(f"\n[BACKEND REQUEST] {request.method} {request.url}")
    print(f"[BACKEND REQUEST HEADERS] {headers}")
    
    response = await call_next(request)
    
    process_time = (time.time() - start_time) * 1000
    print(f"[BACKEND RESPONSE] Status: {response.status_code} | Time: {process_time:.2f}ms\n")
    return response

# 3. Incluir los enrutadores
app.include_router(auth.router)
app.include_router(pantry.router)
app.include_router(recipes.router)
app.include_router(markets.router)

# 4. Definir endpoints directos
@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Backend activo"}

@app.get("/")
def read_root():
    return {
        "status": "online",
        "project": settings.APP_NAME,
        "docs": "/docs"
    }

# 5. Evento de inicio
@app.on_event("startup")
def on_startup():
    init_db()

# 6. Punto de entrada para ejecución local
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )