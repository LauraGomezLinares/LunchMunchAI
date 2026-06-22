# Resumen ejecutivo de TiendaOnline

## Qué es esta app

Este proyecto es una API HTTP sencilla hecha con Ktor. Su estructura actual es pequeña y directa: existe un punto de entrada para levantar el servidor, una configuración de arranque y un archivo donde están declaradas las rutas y los modelos que devuelve la API.

## Cómo ejecutar la app

1. Abrir una terminal en la carpeta raíz del proyecto.
2. Ejecutar `./gradlew run` en macOS/Linux o `gradlew.bat run` en Windows.
3. Esperar a que el servidor arranque en el puerto `8080`.
4. Probar las rutas desde el navegador, Postman o curl.

## Rutas disponibles

- `GET /` devuelve el texto `Bienvenido a la Tienda Online`.
- `GET /productos` devuelve un producto de ejemplo en formato JSON.
- `POST /producto` recibe un JSON con un producto y responde confirmando lo recibido.

## Arquitectura explicada de forma simple

La arquitectura no está separada todavía en capas clásicas como controller, service y repository. En su lugar, todo está concentrado en dos archivos principales:

- [Application.kt](src/main/kotlin/Application.kt): contiene el arranque de Ktor y registra los plugins globales.
- [Routing.kt](src/main/kotlin/Routing.kt): define las rutas HTTP y también los modelos de datos que usa la API.

### Flujo de arranque

1. Ktor inicia con `EngineMain`.
2. El módulo principal `module()` se carga desde [application.yaml](src/main/resources/application.yaml).
3. Se instala `ContentNegotiation` con JSON para poder serializar y deserializar objetos.
4. Se ejecuta `configureRouting()`, donde quedan registradas las rutas.

### Cómo está organizada la lógica

- La configuración técnica vive en [Application.kt](src/main/kotlin/Application.kt).
- Las rutas y respuestas viven en [Routing.kt](src/main/kotlin/Routing.kt).
- Los modelos `Producto` y `RespuestaProducto` están declarados dentro del mismo archivo de rutas, así que por ahora no existe una carpeta dedicada a dominio o DTOs.

## Qué significa esto en la práctica

La app es fácil de entender porque sigue un enfoque lineal: arrancar servidor, configurar JSON y exponer endpoints. La contrapartida es que, a medida que crezca, convendría separar responsabilidades en carpetas como `routes`, `services`, `models` y `config` para que el proyecto siga siendo mantenible.

## Puntos clave para recordar

- El servidor corre en `8080`.
- La entrada principal está en [Application.kt](src/main/kotlin/Application.kt).
- Las rutas están en [Routing.kt](src/main/kotlin/Routing.kt).
- La configuración de despliegue está en [application.yaml](src/main/resources/application.yaml).
- La app ya responde JSON gracias a `ContentNegotiation`.
