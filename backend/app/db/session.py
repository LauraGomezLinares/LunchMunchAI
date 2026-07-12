from sqlmodel import SQLModel, create_engine, Session
from app.core.config import settings

import os

# Verificamos si DATABASE_URL está configurado
if not settings.DATABASE_URL:
    # Fallback a SQLite para desarrollo local rápido si no hay Azure SQL configurado
    # Construimos la ruta absoluta al directorio actual del backend para evitar duplicados según el CWD de ejecución
    backend_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    db_path = os.path.join(backend_dir, "lunchmunch.db")
    DATABASE_URL = f"sqlite:///{db_path}"
    connect_args = {"check_same_thread": False}
else:
    # Si viene de settings.DATABASE_URL, y es una ruta SQLite relativa, la convertimos a absoluta
    if settings.DATABASE_URL.startswith("sqlite:///."):
        relative_path = settings.DATABASE_URL.replace("sqlite:///.", "")
        backend_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        db_path = os.path.abspath(os.path.join(backend_dir, relative_path.lstrip("/\\")))
        DATABASE_URL = f"sqlite:///{db_path}"
    else:
        DATABASE_URL = settings.DATABASE_URL
    connect_args = {"check_same_thread": False} if "sqlite" in DATABASE_URL else {}

# Creación del engine de SQLModel/SQLAlchemy
# Si se conecta a Azure SQL Server, la URL debe usar mssql+pyodbc o similar.
engine = create_engine(
    DATABASE_URL,
    echo=settings.DEBUG,
    connect_args=connect_args
)

def init_db():
    """
    Inicializa las tablas de la base de datos.
    Nota: En producción se recomienda usar Alembic para migraciones.
    """
    # Importamos los modelos explícitamente antes de crear las tablas para que 
    # se registren correctamente en SQLModel.metadata.
    from app.models.user import User
    from app.models.pantry import PantryItem
    from app.models.recipe import FavoriteRecipe
    
    SQLModel.metadata.create_all(engine)

def get_session():
    """
    Generador de sesiones de base de datos para inyección de dependencias en FastAPI.
    """
    with Session(engine) as session:
        yield session
