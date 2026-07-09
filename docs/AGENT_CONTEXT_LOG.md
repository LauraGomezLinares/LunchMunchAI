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
| Fecha de última actualización | `[COMPLETAR]` |
| Feature en curso | `[COMPLETAR: ej. FEAT-03]` |
| % avance estimado del backend | `[COMPLETAR]` |
| Bloqueador activo (si existe) | `[COMPLETAR o "Ninguno"]` |
| Último endpoint FastAPI modificado | `[COMPLETAR: ej. POST /suggest]` |
| Última decisión de arquitectura | `[COMPLETAR — referenciar ADR # de SYSTEM_ARCHITECTURE.md]` |
| Próximo paso inmediato | `[COMPLETAR: la tarea concreta que sigue]` |

---

## 2. Pendientes críticos abiertos (checklist viva, se tacha, no se borra)

- [ ] Definir mecanismo de auth definitivo — Azure Entra ID vs Firebase (detectado en Sesión 0).
- [ ] Configurar inyección dinámica de contexto (alergias/preferencias) desde Azure SQL hacia el System Prompt para ahorrar tokens.
- [ ] `[COMPLETAR]`

> Cuando un pendiente se resuelve, se marca `[x]` y se referencia la entrada de bitácora donde se resolvió — no se elimina de la lista (sirve como trazabilidad histórica).

---

## 3. Historial de sesiones (agregar entradas nuevas AL FINAL, orden cronológico)

### Plantilla para nueva entrada (copiar y pegar debajo de la última)

```markdown
### Sesión [N] — [fecha]
**Agente/modelo usado:** [ej. gpt-4o-mini / gpt-4o / Claude 3.5]
**Feature(s) trabajada(s):** [ID de SPEC_FEATURES.md]

**Qué se hizo:**
- [Resumen funcional en 2-4 líneas, sin pegar código]

**Impacto en Frontend (React Native):**
- [Detallar si cambió algún payload JSON, si hay una nueva ruta REST, o si se requiere enviar un nuevo header]

**Archivos modificados/creados:**
- `ruta/al/archivo.py` — [qué cambió, en una frase]

**Decisiones tomadas:**
- [Si aplica, referenciar también en SYSTEM_ARCHITECTURE.md §9 ADR]

**Problemas encontrados / no resueltos:**
- [Detalle del bloqueador, con el mensaje de error exacto si es técnico]

**Próximo paso sugerido para la siguiente sesión:**
- [Instrucción concreta y accionable]