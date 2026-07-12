# SYSTEM_ARCHITECTURE.md
> **Propósito de este archivo:** Es la ÚNICA fuente de verdad técnica del backend. Todo agente de IA debe leer este archivo ANTES de escribir una sola línea de código. No se debe re-explicar el stack en el chat: se referencia este documento.
>
> **Regla de oro para el agente:** Si una decisión técnica no está aquí, el agente debe PREGUNTAR o proponer una entrada nueva antes de asumir. No inventar servicios de Azure ni librerías que no estén listados en la sección 3. Cuidar el consumo de tokens es prioridad técnica.

---

## 0. Metadata del documento
| Campo | Valor |
|---|---|
| Proyecto | LunchMunchAI |
| Enfoque de desarrollo | Backend (Python / FastAPI) |
| Última actualización | 08 de Julio de 2026 |
| Responsable de arquitectura | Luis Humberto Morales Mendez |
| Versión del documento | v1.0 |

**Instrucción de uso:** cada vez que se tome una decisión de arquitectura nueva, se actualiza este archivo y se sube la versión. No se documentan aquí bugs ni tareas — eso va en `AGENT_CONTEXT_LOG.md`.

---

## 1. Resumen del sistema (contexto agnóstico)

LunchMunchAI es un asistente inteligente que genera recetas personalizadas a partir del inventario de ingredientes del usuario (ingresados manualmente o por foto), aplicando filtrado por alergias/restricciones, priorización de insumos perecibles y geolocalización de mercados cercanos para adquirir lo faltante. El backend FastAPI actúa como capa de orquestación asíncrona entre el cliente móvil, el motor de IA (RAG + reglas), la base de datos relacional y las APIs externas.

---

## 2. Alcance del backend (qué SÍ y qué NO construye el agente)

### Sí construye:
- API REST (FastAPI) asíncrona con endpoints de: autenticación (validación de tokens), inventario, subida/procesamiento de imágenes, generación de recetas y geolocalización.
- Lógica de orquestación hacia Azure AI Foundry (Agent Service) utilizando el `azure-ai-projects` SDK.
- Capa de acceso a datos y ORM hacia Azure SQL Database con gestión de migraciones estructuradas.
- Integración asíncrona con Google Maps Places API y Geocoding API.
- Motor híbrido de recomendación: inyección dinámica de reglas de seguridad alimentaria (alergias extraídas del token de usuario) + recuperación semántica fragmentada (RAG).

### No construye (fuera de alcance de este repo):
- Frontend móvil (React Native) — se consume como cliente externo.
- Entrenamiento de modelos de ML propios (se usa gpt-4o-mini de forma nativa).
- Modelo de monetización / pasarela de pagos.

---

## 3. Stack tecnológico (fuente de verdad — NO improvisar)

| Capa | Tecnología | Estado | Notas |
|---|---|---|---|
| Frontend (Cliente Móvil) | React Native (Expo + TypeScript) | En uso | Interfaz móvil con Zustand para estados y React Navigation |
| Backend framework | FastAPI (Python) | En uso | Orquestador principal, manejo nativo `async/await` |
| Lenguaje (Backend) | Python 3.11+ | En uso | Versión estándar recomendada para compatibilidad asíncrona |
| ORM & Migraciones | SQLModel / SQLAlchemy + Alembic | En uso | Alembic manejará de forma estricta el ciclo de vida de la BD |
| IA generativa | Azure AI Foundry – Agent Service (gpt-4o-mini) | En uso | Modelo económico y rápido. Automatizado vía SDK |
| Búsqueda semántica (RAG) | Azure AI Search | En uso | Índice vectorial. Fragmentación con solapamiento controlado |
| Almacenamiento | Azure Blob Storage | En uso | Almacenamiento de archivos `.md` del RAG e imágenes temporales |
| Base de datos relacional | Azure SQL Database | En uso | Almacenamiento de usuarios, alergias, perfiles y tablas relacionales |
| Autenticación | Azure Entra ID (B2C) / API Key | En uso | Identidad basada en JWT/RBAC para cliente y X-API-KEY para agentes |
| Geolocalización | Google Maps Places API + Geocoding API | En uso | Búsqueda logística en radio de 500m – 1000m |

---

## 4. Arquitectura general (diagrama de flujo)

[Cliente Móvil React Native / TS]
│   HTTP/REST (Autenticación Bearer JWT / API Key local)
▼
[Backend API - FastAPI]
├── /routers (auth, pantry, recipes, markets)
├── /core (pydantic-settings validation, config, security)
├── /db & /models (SQLModel ORM + Alembic)
└── /services (azure-ai-projects SDK, Google Maps client, Image compression)
│
├──► [Azure SQL Database] (Validación local/relacional y persistencia de perfiles)
│
├──► [Azure AI Foundry - Agent Service, gpt-4o-mini]
│        ├── System prompt (Inyección al vuelo de alergias extraídas del JWT actual)
│        ├── File Search tool ──► [Azure AI Search: Chunks vectoriales indexados]
│        ├── Vision (Procesamiento de imágenes previamente reducidas en backend)
│        └── Guardrails (Políticas de seguridad de contenido)
│              │
│              ▼
│        [Azure Blob Storage: recetas.md, ingredientes.md, sopas.md, postres.md]
│
└──► [Google Maps APIs] (Búsqueda asíncrona de mercados cercanos)

---

## 5. Estructura de carpetas del backend

```text
/backend
├── /app
│   ├── /routers       # Endpoints independientes (auth.py, pantry.py, recipes.py, markets.py)
│   ├── /services      # Lógica de negocio (azure_ai.py, google_maps.py, image_processor.py)
│   ├── /models        # Esquemas de validación Pydantic y Modelos de datos SQLModel
│   ├── /db            # Sesión asíncrona, conectores y configuración de Azure SQL
│   ├── /core          # Configuración global (config.py), seguridad, manejo de errores de API
│   └── main.py        # Punto de entrada de la aplicación FastAPI
├── /alembic           # Entorno de control de versiones de base de datos generado por Alembic
├── alembic.ini        # Configuración interna de Alembic
├── .env.example       # Variables de entorno requeridas estructuradas de forma limpia
├── requirements.txt   # Dependencias fijadas del sistema (FastAPI, SQLModel, Alembic, azure-ai-projects, etc.)
└── README.md