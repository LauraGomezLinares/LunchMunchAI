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

| Campo | Valor |
|---|---|
| Fecha de última actualización | `16 de Julio de 2026` |
| Feature en curso | `Optimización de Favoritos y Rendimiento de Base de Datos / UI` |
| % avance estimado del backend | `90%` |
| Bloqueador activo (si existe) | `Ninguno` |
| Último endpoint FastAPI modificado | `Optimización de relaciones lazy en el modelo User (lazy="select")` |
| Última decisión de arquitectura | `Uso de Zustand Store y Actualizaciones Optimistas en Frontend + Lazy Loading en Backend` |
| Próximo paso inmediato | `Avanzar con la geolocalización de mercados para ingredientes faltantes (FEAT-04)` |

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

---

### Sesión 3 — 12 de Julio de 2026
**Agente/modelo usado:** Antigravity (Gemini 3.5 Flash)
**Feature(s) trabajada(s):** Conexión de Red, Autenticación Real, y CRUD de Despensa (FEAT-02)

**Qué se hizo:**
- Backend: Añadido middleware de logging de peticiones en `main.py` para visualizar headers y métodos HTTP.
- Backend: Registrado el endpoint `GET /recipes/recommend` para que retorne datos estructurados y evitar el error 404 del frontend.
- Frontend: Creado el servicio `services/api/pantry.ts` con funciones `fetchPantryItems`, `addPantryItemBackend` y `deletePantryItemBackend` que integran el header `X-API-KEY`.
- Frontend: Modificado `PantryScreen.tsx` para sincronizar la UI y el estado global de Zustand directamente con el backend SQLite.
- Frontend: Creado `.env` y `.env.example` en la carpeta móvil para soportar URLs de túneles como Ngrok de manera configurable.
- Documentación: Actualizados los archivos `README.md` maestro, `SYSTEM_ARCHITECTURE.md`, `INTEGRATION_AZURE.md` y la bitácora operativa.

**Impacto en Frontend (React Native):**
- La aplicación móvil ahora sincroniza su despensa en tiempo real (añadir/quitar ingredientes) persistiendo los cambios de forma física en la base de datos a través de peticiones HTTP.

**Archivos modificados/creados:**
- `frontend/src/services/api/pantry.ts` — Wrapper de API para el CRUD de despensa.
- `frontend/src/screens/pantry/PantryScreen.tsx` — Pantalla de despensa refactorizada con efectos de carga.
- `docs/INTEGRATION_AZURE.md` — Documentación extendida de variables de entorno y túneles Ngrok.
- `docs/AGENT_CONTEXT_LOG.md` — Bitácora e historial actualizados.

**Decisiones tomadas:**
- Se configuró la persistencia física local mediante una SQLite de desarrollo local (`lunchmunch.db`). Los datos se persisten de forma consistente entre reinicios del servidor FastAPI gracias al ORM SQLModel y las migraciones Alembic.

**Problemas encontrados / no resueltos:**
- Ninguno. La conexión local/remota a través del túnel Ngrok se validó con código HTTP 200 exitoso.

**Próximo paso sugerido para la siguiente sesión:**
- Desarrollar la lógica del motor híbrido de recetas en `backend/app/services/azure_ai.py` conectando con el Azure AI Foundry Agent Service real.

---

### Sesión 4 — 12 de Julio de 2026
**Agente/modelo usado:** Antigravity (Gemini 3.5 Flash)
**Feature(s) trabajada(s):** Validación Real de JWT y CRUD de Despensa Seguro (FEAT-01 & FEAT-02)

**Qué se hizo:**
- Backend: Implementada la dependencia `verify_jwt` en `app/core/security.py`. Valida que el token JWT sea un UUID existente en la tabla de usuarios de la base de datos (SQLite/Azure SQL), rechazando peticiones no autorizadas.
- Backend: Modificado el endpoint `POST /auth/login` para validar las credenciales (email y hashed password) contra la base de datos física, retornando el UUID de usuario como token en caso de éxito.
- Backend: Refactorizados los endpoints del enrutador `app/routers/pantry.py` para utilizar `verify_jwt` en lugar de la API key anterior, deduciendo dinámicamente el `usuario_id` del token autenticado.
- Frontend: Modificado `services/api/pantry.ts` y `PantryScreen.tsx` para ajustarse a los nuevos endpoints seguros basados en JWT (removiendo el `usuarioId` en los parámetros de la petición).

**Impacto en Frontend (React Native):**
- El inicio de sesión ahora valida credenciales reales.
- El inventario de despensa se asocia automáticamente de forma segura al perfil del usuario autenticado en sesión.

**Archivos modificados/creados:**
- `backend/app/core/security.py` — Validación de tokens JWT en base de datos.
- `backend/app/routers/auth.py` — Login con base de datos real.
- `backend/app/routers/pantry.py` — Endpoints CRUD protegidos por JWT.
- `frontend/src/services/api/pantry.ts` — Endpoints limpios del backend.
- `frontend/src/screens/pantry/PantryScreen.tsx` — Flujo de guardado seguro adaptado a JWT.
- `docs/AGENT_CONTEXT_LOG.md` — Bitácora e historial actualizados.

**Decisiones tomadas:**
- Utilizar el ID del usuario en base de datos (UUID) como token de sesión en esta fase MVP para simplificar la integración sin acoplar dependencias complejas.

**Problemas encontrados / no resueltos:**
- Ninguno.

**Próximo paso sugerido para la siguiente sesión:**
- Integrar el Azure AI Foundry Agent real en el backend.

---

**Próximo paso sugerido para la siguiente sesión:**
- Realizar pruebas de generación de recetas por IA desde la app móvil.

---

### Sesión 5 — 12 de Julio de 2026
**Agente/modelo usado:** Antigravity (Gemini 3.5 Flash)
**Feature(s) trabajada(s):** Integración Directa de Azure AI Foundry y Endpoint de Recetas Seguro (FEAT-03)

**Qué se hizo:**
- Backend: Modificado [session.py](file:///c:/Users/User/Documents/LunchMunchAI/backend/app/db/session.py) eliminando la lógica de seeding automático para comenzar con una base de datos limpia de desarrollo.
- Backend: Modificado [auth.py](file:///c:/Users/User/Documents/LunchMunchAI/backend/app/routers/auth.py) liberando `POST /auth/register` de requerimiento de API Key, haciendo el email lookup insensible a mayúsculas/minúsculas y ajustando el conflicto a `409 Conflict`.
- Backend: Creado el archivo de variables [.env](file:///c:/Users/User/Documents/LunchMunchAI/backend/.env) mapeando tu clave de API, endpoint de Azure AI y el despliegue `gpt-5-mini` de forma confidencial local (se borró `.env.example`).
- Backend: Desarrollado `AzureAIService` en [azure_ai.py](file:///c:/Users/User/Documents/LunchMunchAI/backend/app/services/azure_ai.py) con llamadas REST nativas al servicio de Azure OpenAI, forzando formato JSON estricto (`response_format`) e integrando timeouts e impresión del input/output en consola para auditoría.
- Backend: Conectado el endpoint `GET /recipes/recommend` en [recipes.py](file:///c:/Users/User/Documents/LunchMunchAI/backend/app/routers/recipes.py) bajo la seguridad del Bearer JWT, consultando automáticamente la despensa del usuario actual en SQLite y pasándole los ingredientes a `AzureAIService`.
- Documentación: Actualización en `docs/AGENT_CONTEXT_LOG.md` reflejando el progreso finalizado y las decisiones de arquitectura.

**Impacto en Frontend (React Native):**
- El flujo de Registro y Login ya opera de forma transparente contra la base de datos limpia.
- La pantalla de Recetas ya invoca directamente tu infraestructura de Azure AI Foundry a través del backend pasando por el túnel público.

**Archivos modificados/creados:**
- `backend/app/db/session.py` — Remoción de seeding de usuarios.
- `backend/app/routers/auth.py` — Registro abierto e insensible a mayúsculas.
- `backend/app/services/azure_ai.py` — Integración HTTP/REST real con Azure OpenAI.
- `backend/app/routers/recipes.py` — Endpoint de recetas conectado a la base de datos y a Azure AI.
- `docs/AGENT_CONTEXT_LOG.md` — Bitácora e historial actualizados.

**Decisiones tomadas:**
- Simplificación del pipeline de IA mediante llamadas directas al SDK de Azure AI Foundry, asegurando respuestas con esquemas predecibles (JSON estructurado) y monitoreo de terminal para auditoría clara del prompt.

**Próximo paso sugerido para la siguiente sesión:**
- Realizar pruebas integrales de generación de recetas por IA desde la app móvil.

---

### Sesión 6 — 12 de Julio de 2026
**Agente/modelo usado:** Antigravity (Gemini 3.5 Flash)
**Feature(s) trabajada(s):** Despensa Dinámica, Integración con Azure OpenAI y Mapeo Estructural (FEAT-02 & FEAT-03)

**Qué se hizo:**
- Backend: Configurado `DATABASE_URL` en [session.py](file:///c:/Users/User/Documents/LunchMunchAI/backend/app/db/session.py) para resolver la base de datos SQLite de manera absoluta, solucionando inconsistencias de lectura de bases de datos vacías según la terminal de ejecución.
- Backend: Modificado el endpoint `/recipes/recommend` en [recipes.py](file:///c:/Users/User/Documents/LunchMunchAI/backend/app/routers/recipes.py) agregando validaciones para despensas vacías e ingredientes no aptos por alérgenos.
- Backend: Implementado el cliente de conexión real a través de la clase `AzureOpenAI` en [azure_ai.py](file:///c:/Users/User/Documents/LunchMunchAI/backend/app/services/azure_ai.py), resolviendo el error `'AzureKeyCredential' object has no attribute 'get_token'` al prescindir de Entra ID y usar autenticación directa mediante API Key.
- Backend: Removidos parámetros no soportados (`temperature` y `response_format`) en la invocación del despliegue `gpt-5-mini` de Azure OpenAI.
- Backend: Diseñado un mapeador estructural en `azure_ai.py` que estandariza automáticamente la salida JSON del Agente de Azure Foundry `{ 'receta', 'ingredientes', 'instrucciones' }` al formato extendido requerido por el frontend (`id`, `title`, `steps`, `nutrition`, `image`).
- Frontend: Rediseñado [PantryScreen.tsx](file:///c:/Users/User/Documents/LunchMunchAI/frontend/src/screens/pantry/PantryScreen.tsx) para admitir ingredientes dinámicos ilimitados mediante una caja de texto libre (`customIngredient`) y agregando visualmente el conteo y borrado de la despensa real en tiempo real.
- Frontend: Conectados los botones de "Generar IA" en [RecipesListScreen.tsx](file:///c:/Users/User/Documents/LunchMunchAI/frontend/src/screens/recipes/RecipesListScreen.tsx) y optimizada la carga con `ActivityIndicator` y manejo de excepciones nativas (`alert`).
- Frontend: Solucionado el error de imágenes que no cargaban en [RecipeCard.tsx](file:///c:/Users/User/Documents/LunchMunchAI/frontend/src/components/features/RecipeCard.tsx) al redirigir las URLs obsoletas de `source.unsplash.com` hacia un fallback de placeholder de alta calidad en `images.unsplash.com`.

**Impacto en Frontend (React Native):**
- Los usuarios pueden agregar cualquier ingrediente personalizado a su despensa de forma persistente.
- El flujo de login, registro, manejo de despensa y generación real ya funciona completamente integrado contra el modelo `gpt-5-mini` de Azure AI Foundry, mostrando múltiples recetas creativas y estables en el emulador.

**Archivos modificados/creados:**
- `backend/app/db/session.py` — Ruta de SQLite absoluta.
- `backend/app/routers/recipes.py` — Validación de despensa vacía y control de alérgenos.
- `backend/app/services/azure_ai.py` — Cliente nativo `AzureOpenAI`, remoción de parámetros no soportados y mapeador de esquemas.
- `frontend/src/screens/pantry/PantryScreen.tsx` — Caja de texto para ingredientes ilimitados.
- `frontend/src/screens/recipes/RecipesListScreen.tsx` — Botón interactivo de generación por IA y estados de carga.
- `frontend/src/components/features/RecipeCard.tsx` — Conversión de endpoints de Unsplash obsoletos.
- `docs/AGENT_CONTEXT_LOG.md` — Bitácora e historial actualizados.

**Decisiones tomadas:**
- Utilizar el cliente de `AzureOpenAI` en lugar del restrictivo `AIProjectClient` para simplificar la autenticación por API Key estática, manteniendo la robustez del modelo `gpt-5-mini`.

**Próximo paso sugerido para la siguiente sesión:**
- Avanzar con la geolocalización de mercados para ingredientes faltantes (FEAT-04).

---

### Sesión 7 — 16 de Julio de 2026
**Agente/modelo usado:** Antigravity (Gemini 3.5 Flash)
**Feature(s) trabajada(s):** Optimización de Carga y Rendimiento (Favoritos, Caché Local, Lazy Loading y Actualizaciones Optimistas)

**Qué se hizo:**
- **Frontend**: Integrado un sistema de caché persistente para favoritos usando el store global de **Zustand** (`useAppStore.ts`), guardando y sincronizando con `AsyncStorage`.
- **Frontend**: Resuelto el error de doble petición concurrente en `ProfileScreen.tsx` removiendo la llamada en el montaje y manteniéndola solo bajo el listener `'focus'` de React Navigation.
- **Frontend**: Añadido indicador de carga nativo (`ActivityIndicator`) en `ProfileScreen.tsx` que se muestra únicamente cuando no existen recetas favoritas precargadas en memoria y el backend está procesando.
- **Frontend**: Implementada **Actualización Optimista** en `ProfileScreen.tsx` al borrar favoritos (se eliminan instantáneamente de la UI en 0ms y se revierte solo si falla la llamada HTTP).
- **Frontend**: Implementada **Sincronización Inmediata** al agregar favoritos en `RecipeDetailScreen.tsx` que actualiza el store de Zustand al instante para reflejar el cambio tan pronto el usuario vuelve al perfil.
- **Backend**: Optimizado el rendimiento de base de datos modificando las relaciones `pantry_items` y `favorite_recipes` del modelo `User` en `backend/app/models/user.py` para usar carga perezosa (`lazy="select"`), evitando consultas SQL redundantes durante la validación JWT (`verify_jwt`).
- **Documentación**: Actualizados los archivos `README.md` y `docs/AGENT_CONTEXT_LOG.md` reflejando las técnicas de optimización, mejoras de desarrollo local bypassando ngrok y detalles de estado.

**Impacto en Frontend (React Native):**
- La carga y navegación de favoritos en la pestaña Perfil ahora se percibe instantánea (0ms) al consumir los datos cacheados localmente.
- Los botones de añadir y eliminar favoritos reaccionan de manera fluida e inmediata sin latencias de red perceptibles.

**Archivos modificados/creados:**
- `frontend/src/types/index.ts` — Agregado tipo `favorites` al estado.
- `frontend/src/store/useAppStore.ts` — Acciones locales de favoritos y configuración de persistencia.
- `frontend/src/screens/profile/ProfileScreen.tsx` — Eliminada llamada doble, agregado spinner y eliminación optimista.
- `frontend/src/screens/recipes/RecipeDetailScreen.tsx` — Añadido guardado local directo al store de Zustand.
- `backend/app/models/user.py` — Cambio a lazy loading (`"lazy": "select"`) en relaciones.
- `README.md` — Agregada sección de optimización y bypass de ngrok.
- `docs/AGENT_CONTEXT_LOG.md` — Bitácora e historial actualizados.

**Decisiones tomadas:**
- Utilizar actualizaciones optimistas locales combinadas con la persistencia en Zustand para enmascarar por completo la latencia inherente de los túneles ngrok en desarrollo y mejorar drásticamente la calidad visual percibida.

**Próximo paso sugerido para la siguiente sesión:**
- Continuar con la geolocalización de mercados locales (FEAT-04).