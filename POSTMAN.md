# Consultas de Postman para TiendaOnline

A continuación se detallan las consultas que puedes realizar para probar el servidor localmente usando Postman u otra herramienta cliente REST. Asegúrate de tener el servidor corriendo en `http://localhost:8080`.

## 1. Obtener Bienvenida (GET)

- **URL:** `http://localhost:8080/`
- **Método:** `GET`
- **Descripción:** Retorna el mensaje de bienvenida de la API.

## 2. Obtener Productos (GET)

- **URL:** `http://localhost:8080/productos`
- **Método:** `GET`
- **Descripción:** Retorna la lista completa de todos los productos guardados (en formato de arreglo JSON).

## 3. Crear Producto (POST)

- **URL:** `http://localhost:8080/producto`
- **Método:** `POST`
- **Headers:** 
  - `Content-Type`: `application/json`
- **Body (raw JSON):**
  ```json
  {
      "nombre": "Teclado Mecánico",
      "precio": 350000.0
  }
  ```
- **Descripción:** Envía un JSON con un producto y el servidor responde confirmando la recepción con el mismo producto.
