# TiendaOnline

Este proyecto es una API HTTP sencilla desarrollada con [Ktor](https://ktor.io/). Proporciona endpoints básicos para gestionar productos y sirve como base para una tienda online.

## Cómo ejecutar la app

Para construir y ejecutar el proyecto localmente:

1. Abre una terminal en la carpeta raíz del proyecto.
2. Ejecuta el siguiente comando según tu sistema operativo:
   - **Windows:** `gradlew.bat run`
   - **macOS/Linux:** `./gradlew run`
3. Espera a que el servidor arranque en el puerto `8080`.
   Deberías ver un mensaje indicando: `Responding at http://0.0.0.0:8080`

## Rutas Disponibles

- `GET /` - Devuelve un texto de bienvenida.
- `GET /productos` - Devuelve un producto de ejemplo en formato JSON.
- `POST /producto` - Recibe un producto en formato JSON y responde confirmando lo recibido.

> **Pruebas de API:** Para facilitar la prueba de los endpoints, se ha preparado una guía con las [Consultas de Postman](POSTMAN.md) listas para importar o copiar.

## Arquitectura

Actualmente, el proyecto mantiene una estructura directa en `src/main/kotlin`:
- **`Application.kt`**: Contiene el arranque de Ktor y la configuración de plugins (como `ContentNegotiation` para JSON).
- **`Routing.kt`**: Define todas las rutas HTTP y los modelos de datos (ej. `Producto`, `RespuestaProducto`).
- **`application.yaml`**: Archivo de configuración de arranque, ubicado en `src/main/resources/`.

A medida que el proyecto crezca, se recomienda separar responsabilidades en carpetas como `routes`, `services` y `models` para mantenerlo ordenado.
