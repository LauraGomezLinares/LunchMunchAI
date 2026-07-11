from sqlmodel import SQLModel, create_engine, Session
from app.core.config import settings

# Verificamos si DATABASE_URL está configurado
if not settings.DATABASE_URL:
    # Fallback a SQLite en memoria para desarrollo local rápido si no hay Azure SQL configurado
    DATABASE_URL = "sqlite:///./local_dev.db"
    connect_args = {"check_same_thread": False}
else:
    DATABASE_URL = settings.DATABASE_URL
    connect_args = {}

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
    SQLModel.metadata.create_all(engine)

def get_session():
    """
    Generador de sesiones de base de datos para inyección de dependencias en FastAPI.
    """
    with Session(engine) as session:
        yield session
