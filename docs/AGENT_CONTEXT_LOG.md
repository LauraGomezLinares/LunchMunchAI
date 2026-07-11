# AGENT_CONTEXT_LOG.md
> **Propósito de este archivo:** Es la MEMORIA operativa del proyecto entre sesiones de "live coding" con distintos agentes de IA. Reemplaza el contexto que un agente perdería al cerrar el chat. **Un agente nuevo debe leer SOLO la sección "1. Estado actual" + las últimas 2-3 entradas de la bitácora antes de trabajar** — no necesita releer todo el historial completo (regla estricta de ahorro de tokens).

---

## 0. Instrucciones de uso (leer primero, tanto humano como agente)

**Al INICIAR una sesión, el agente debe:**
1. Leer la sección `1. Estado actual del proyecto`.
2. Leer únicamente las 2-3 entradas más recientes de la sección `3. Historial de sesiones`.
3. Confirmar en su primera respuesta: *"Retomando desde: [resumen de 1 línea del último punto pendiente]"* — esto valida que el contexto se cargó bien sin gastar tokens extra.

**Al CERRAR una sesión, el agente DEBE (sin excepción):** 
1. Generar una nueva entrada en la sección 3 con el formato de la plantilla.
2. Actualizar la sección 1 si el estado global cambió.

**Reglas de oro (Token-eficiencia y Arquitectura):** 
- No se debe copiar código completo en esta bitácora, solo rutas de archivo y un resumen funcional. El código vive en el repositorio.
- Todo desarrollo de backend debe pensar en la asincronía de **FastAPI** y en devolver JSONs limpios para **React Native**.

---

## 1. Estado actual del proyecto (siempre debe reflejar el AHORA, se sobreescribe)

| Campo | Valor |
|---|---|
| Fecha de última actualización | `11 de Julio de 2026` |
| Feature en curso | `FEAT-01 a FEAT-05 (Configuración de base de datos y migraciones con Alembic)` |
| % avance estimado del backend | `25%` |
| Bloqueador activo (si existe) | `Ninguno` |
| Último endpoint FastAPI modificado | `Integración de base de datos física SQLite en local` |
| Última decisión de arquitectura | `Configuración de Alembic usando SQLModel.metadata y url local` |
| Próximo paso inmediato | `Ejecutar la migración inicial de base de datos en local y levantar el servidor FastAPI` |

---

## 2. Pendientes críticos abiertos (checklist viva, se tacha, no se borra)

- [ ] Definir mecanismo de auth definitivo — Azure Entra ID vs Firebase.
- [ ] Configurar inyección dinámica de contexto (alergias/preferencias) desde base de datos hacia el System Prompt para ahorrar tokens.
- [ ] Integrar el cliente de Azure AI Foundry y Azure AI Search reales en el servicio `azure_ai.py`.
- [x] Configurar las migraciones automáticas mediante Alembic (`alembic init`). *(Resuelto en Sesión 2)*

> Cuando un pendiente se resuelve, se marca `[x]` y se referencia la entrada de bitácora donde se resolvió — no se elimina de la lista (sirve como trazabilidad histórica).

---

## 3. Historial de sesiones (agregar entradas nuevas AL FINAL, orden cronológico)

### Sesión 1 — 09 de Julio de 2026
**Agente/modelo usado:** Antigravity (Gemini 3.5 Flash)
**Feature(s) trabajada(s):** FEAT-01, FEAT-02, FEAT-03, FEAT-04, FEAT-05 (Estructura base)

**Qué se hizo:**
- Creada la estructura base del backend de FastAPI en la carpeta `backend/`.
- Creado `requirements.txt` con todas las dependencias principales (SQLModel, FastAPI, Azure AI SDK, etc.) y `.env.example`.
- Configurado Pydantic-Settings en `backend/app/core/config.py` y sesión base SQLModel en `backend/app/db/session.py`.
- Implementados los skeletons y enrutadores asíncronos para `/auth`, `/pantry` (CRUD), `/recipes` y `/markets`.
- Añadidos skeletons de servicios para Azure AI, Google Maps y procesamiento de imágenes.
- Actualizado el `README.md` del repositorio con una guía completa de configuración paso a paso y comandos de Git.

**Impacto en Frontend (React Native):**
- Los enrutadores devuelven payloads JSON estructurados listos para ser consumidos por el equipo de frontend.
- Se configuró CORS de manera abierta temporalmente para permitir llamadas de depuración locales.

**Archivos modificados/creados:**
- `backend/requirements.txt` — Dependencias iniciales.
- `backend/.env.example` — Plantilla de configuración.
- `backend/app/main.py` — Inicialización de FastAPI.
- `backend/app/core/config.py` — Configuración mediante Pydantic.
- `backend/app/db/session.py` — Conector de BD (SQLite/Azure SQL).
- `backend/app/models/` — Modelos SQLModel de usuario y despensa.
- `backend/app/routers/` — Rutas estructuradas de negocio.
- `backend/app/services/` — Skeletons de llamadas externas y procesamiento.
- `README.md` — Manual de configuración, ejecución y Git.
- `docs/AGENT_CONTEXT_LOG.md` — Actualizada la bitácora operativa.

**Decisiones tomadas:**
- Se implementó una base de datos local SQLite temporal como fallback automático si no está configurada la cadena de conexión de Azure SQL para facilitar el desarrollo local e independiente de la conectividad en la nube.

**Problemas encontrados / no resueltos:**
- Ninguno técnico.

**Próximo paso sugerido para la siguiente sesión:**
- Crear la instancia de base de datos en Azure SQL y configurar las migraciones iniciales de base de datos con Alembic para que no se pierdan datos en producción.

---

### Sesión 2 — 11 de Julio de 2026
**Agente/modelo usado:** Antigravity (Gemini 3.5 Flash)
**Feature(s) trabajada(s):** Configuración de Base de Datos y Migraciones (Alembic + SQLModel)

**Qué se hizo:**
- Configuración de `alembic/env.py` añadiendo el parent path, importando SQLModel, cargando explícitamente los modelos (`User`, `PantryItem`) y asociando `target_metadata = SQLModel.metadata`.
- Modificación de `alembic.ini` para establecer la URL de la base de datos sqlite local en `sqlite:///./lunchmunch.db`.
- Actualización de estados de `FEAT-01` y `FEAT-02` en `docs/SPEC_FEATURES.md` a `🟡 En progreso` eliminando marcas de bloqueante de auth en dependencias.
- Inclusión de instrucciones sobre migraciones en `README.md`.
- Documentación de los pasos restantes para que el usuario ejecute la migración inicial en su entorno local con PowerShell.

**Impacto en Frontend (React Native):**
- Ninguno de momento, sentando las bases físicas del almacenamiento relacional de datos locales.

**Archivos modificados/creados:**
- `backend/alembic/env.py` — Configuración de entorno y metadatos.
- `backend/alembic.ini` — Cadena de conexión sqlite.
- `docs/SPEC_FEATURES.md` — Estados de las features principales y dependencias limpias.
- `README.md` — Instrucciones de Alembic en la sección de inicio rápido.
- `docs/AGENT_CONTEXT_LOG.md` — Actualización del estado actual e historial.

**Decisiones tomadas:**
- Se enlazaron los modelos de SQLModel explícitamente en `env.py` para asegurar que el sistema detecte cambios en `User` y `PantryItem`.

**Problemas encontrados / no resueltos:**
- El agente no posee permisos directos de ejecución para comandos en el host, por lo que el usuario debe ejecutar los comandos de migración (`alembic revision` y `alembic upgrade head`) y levantar el servidor FastAPI (`uvicorn app.main:app --reload`) manualmente.

**Próximo paso sugerido para la siguiente sesión:**
- Ejecutar la prueba de humo del backend levantando el servidor FastAPI y verificando los endpoints locales una vez generadas y aplicadas las migraciones físicas.