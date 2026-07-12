# SPEC_FEATURES.md
> **Propósito de este archivo:** Backlog técnico bajo metodología **SDD (Spec-Driven Development)**. Cada feature se especifica ANTES de programarla: qué recibe, qué entrega, y cómo se sabe que está "hecha". El agente de IA debe implementar código que satisfaga EXACTAMENTE la especificación aquí escrita — no debe inventar comportamiento no especificado.
>
> **Regla de oro para el agente:** Si vas a programar una feature, cita su ID (ej. `FEAT-03`) en tus commits/respuestas. Si la especificación es ambigua o incompleta, no la completes por tu cuenta: señala el vacío y pregunta.

---

## 0. Cómo leer y actualizar este archivo

| Campo | Significado |
|---|---|
| **ID** | Identificador único (ej. FEAT-01). Trazable a Historias de Usuario / Casos de Uso originales del documento de tesis. |
| **Estado** | `🔴 No iniciado` / `🟡 En progreso` / `🟢 Terminado` / `⚪ Bloqueado` |
| **Prioridad** | Alta / Media / Baja (heredada del Product Backlog) |
| **Input** | Qué recibe el sistema (payload, parámetros, contexto de usuario) |
| **Output** | Qué debe devolver el sistema (formato exacto, incluyendo errores) |
| **Criterios de aceptación** | Condiciones verificables de "terminado" (Definition of Done) |
| **Dependencias** | Otras features o servicios de Azure que deben existir antes |

`[COMPLETAR: mantener esta tabla de estados actualizada en cada sesión de trabajo — es lo primero que debe leer un agente nuevo]`

---

## FEAT-01 — Registro y configuración de perfil (Alergias/Restricciones)
**Trazabilidad:** HU-01 / CU01, CU03
**Estado:** 🟢 Terminado
**Prioridad:** Alta

**Descripción funcional:**
Como usuario, quiero registrar mi cuenta y configurar mis restricciones dietéticas (alergias) para que el sistema filtre opciones seguras para mi salud.

**Input esperado:**
```json
{
  "nombre": "string",
  "email": "string",
  "password": "string",
  "alergias": ["maní", "lactosa"],
  "objetivos_nutricionales": "string opcional"
}
```

**Output esperado:**
```json
{
  "usuario_id": "uuid",
  "status": "creado",
  "perfil": { "alergias": [...], "preferencias": {...} }
}
```

**Criterios de aceptación:**
- [x] Registro de credenciales validado contra la base de datos relacional.
- [x] Los alérgenos seleccionados se guardan correctamente y son recuperables en el perfil del usuario.
- [x] Rechaza registro con email duplicado de manera insensible a mayúsculas/minúsculas.

**Dependencias:** FEAT-01.

---

## FEAT-02 — Gestión de inventario de despensa (CRUD)
**Trazabilidad:** HU-02 / CU04
**Estado:** 🟢 Terminado
**Prioridad:** Alta

**Descripción funcional:**
Como usuario, quiero agregar, modificar, visualizar o eliminar ingredientes de mi despensa para mantener un inventario digital exacto.

**Input esperado:**
```json
{
  "usuario_id": "uuid",
  "ingrediente": "string",
  "cantidad": "number",
  "unidad": "string",
  "fecha_caducidad": "date opcional"
}
```

**Output esperado:** Lista actualizada del inventario del usuario, o confirmación de la operación (create/update/delete).

**Criterios de aceptación:**
- [x] Soporta las 4 operaciones CRUD de despensa de manera asíncrona.
- [x] Sincronización correcta con la base de datos local SQLite persistida de forma absoluta.
- [x] Input de texto libre en el frontend para ingredientes ilimitados.

**Dependencias:** FEAT-01.

---

## FEAT-03 — Generación de receta personalizada (motor híbrido)
**Trazabilidad:** HU-03 / CU05, CU06, CU07, CU08
**Estado:** 🟢 Terminado
**Prioridad:** Alta (crítica)

**Descripción funcional:**
Como usuario sin tiempo, quiero solicitar una sugerencia de receta basada en mi despensa para decidir rápidamente qué cocinar optimizando mis recursos.

**Input esperado:**
```json
{
  "usuario_id": "uuid",
  "ingredientes_disponibles": ["quinoa", "palta", "limón"]
}
```

**Output esperado:**
Un arreglo de objetos JSON estructurados con las claves de recetas requeridas para la aplicación móvil.

**Lógica interna obligatoria (no negociable, viene del documento fuente):**
1. Filtrado estricto por reglas (excluir alérgenos) — **debe ejecutarse siempre primero**.
2. Conexión nativa con Azure OpenAI utilizando el despliegue `gpt-5-mini` real.
3. El Agent Service genera la receta final en base a la despensa y alérgenos de Luis.

**Criterios de aceptación:**
- [x] Exclusión de alérgenos con precisión del 100% (0 falsos negativos) — **crítico por seguridad alimentaria**.
- [x] Integración real con Azure OpenAI de forma asíncrona.
- [x] Interfaz móvil no auto-bloqueante que procesa la respuesta en tiempo real.

**Dependencias:** FEAT-01, FEAT-02, Azure AI Foundry configurado.

---

## FEAT-04 — Geolocalización de mercados y trazado de ruta
**Trazabilidad:** HU-04 / CU09, CU10
**Estado:** 🔴 No iniciado
**Prioridad:** Media

**Descripción funcional:**
Como usuario con insumos faltantes, quiero ubicar mercados cercanos y trazar la ruta óptima para facilitar mi logística de abastecimiento.

**Input esperado:**
```json
{
  "usuario_id": "uuid",
  "ubicacion_actual": { "lat": 0.0, "lng": 0.0 },
  "ingredientes_faltantes": [...]
}
```

**Output esperado:**
```json
{
  "mercados_cercanos": [
    { "nombre": "string", "direccion": "string", "distancia_m": 0, "lat": 0.0, "lng": 0.0 }
  ],
  "ruta_sugerida": {...}
}
```

**Criterios de aceptación:**
- [ ] El sistema detecta y lista claramente qué ingredientes faltan (dato viene de FEAT-03).
- [ ] Consulta Google Maps Places API en un radio máximo de 1000 metros.
- [ ] Traza ruta geolocalizada usando Geocoding API.
- [ ] Maneja error si no hay conectividad o el API externa falla (respuesta degradada, no un 500 crudo).

**Dependencias:** FEAT-03, credenciales de Google Maps API configuradas.

---

## FEAT-05 — Visualización de información nutricional
**Trazabilidad:** HU-05
**Estado:** 🟢 Terminado
**Prioridad:** Baja

**Descripción funcional:**
Como usuario consciente de mi salud, quiero visualizar la información nutricional de la receta generada para alinear mi alimentación a mis objetivos de bienestar.

**Input esperado:** `receta_id` o el objeto de receta ya generado en FEAT-03.

**Output esperado:**
```json
{ "calorias": 0, "proteinas_g": 0, "carbohidratos_g": 0, "grasas_g": 0 }
```

**Criterios de aceptación:**
- [x] Desglose claro de calorías y macronutrientes principales (carbs, protein, fat).
- [x] Consistencia entre lo mostrado aquí y lo devuelto en FEAT-03 (misma fuente de datos, no recalculado por separado).

**Dependencias:** FEAT-03.

---

## FEAT-06 — Historial y Favoritos de Recetas
**Trazabilidad:** HU-06
**Estado:** 🟢 Terminado
**Prioridad:** Media

**Descripción funcional:**
Como usuario, quiero guardar mis recetas preferidas generadas por la IA para poder consultarlas más tarde de manera local y rápida sin volver a gastar créditos.

**Input esperado:**
```json
{
  "title": "string",
  "category": "string",
  "time": 0,
  "calories": 0,
  "ingredients": [],
  "steps": [],
  "allergens": [],
  "nutrition": {},
  "image": "string"
}
```

**Output esperado:**
Objeto guardado en la base de datos local y sincronizado con el backend, o arreglo de recetas guardadas.

**Criterios de aceptación:**
- [x] Creación de la tabla `favoriterecipe` vinculada al usuario de forma local en SQLite.
- [x] Endpoints CRUD para guardar (`POST`), listar (`GET`) y borrar (`DELETE`) recetas favoritas bajo JWT.
- [x] Pantalla de perfil con listado y borrado de favoritos reactivo.

**Dependencias:** FEAT-01, FEAT-03.

---

## Tabla resumen de trazabilidad (para verificación rápida del agente)

| ID | Nombre | Estado | Prioridad | Endpoint (ver SYSTEM_ARCHITECTURE.md §8) |
|---|---|---|---|---|
| FEAT-01 | Registro y perfil | 🟢 Terminado | Alta | `/auth/register` |
| FEAT-02 | Inventario despensa | 🟢 Terminado | Alta | `/pantry` |
| FEAT-03 | Generación de receta | 🟢 Terminado | Alta | `/recipes/recommend` |
| FEAT-04 | Geolocalización mercados | 🔴 No iniciado | Media | `/markets/nearby` |
| FEAT-05 | Info nutricional | 🟢 Terminado | Baja | `/recipes/{id}/nutrition` |
| FEAT-06 | Historial y Favoritos | 🟢 Terminado | Media | `/recipes/favorites` |
