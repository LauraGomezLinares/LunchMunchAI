# Integración con Azure AI Foundry (Agent Service)

Este documento detalla la estructura de comunicación, autenticación y los esquemas JSON de los endpoints expuestos para la interacción con el Agente Externo de Azure AI Foundry.

---

## 📱 Configuración del Entorno Móvil (Frontend)

Para conectar el aplicativo React Native (Expo) con el Backend local desde emuladores o dispositivos físicos, tenemos dos opciones:

### Opción A: Dirección IP Local (Requiere que estén en la misma red Wi-Fi y sin restricciones de Firewall)
1. Crea un archivo `.env` en la raíz de la carpeta `frontend/` (basado en `frontend/.env.example`).
2. Configura la dirección IP local de tu máquina ejecutando `ipconfig` en Windows (`ifconfig` en Linux/macOS) en la variable `EXPO_PUBLIC_API_URL`.
   ```env
   EXPO_PUBLIC_API_URL=http://<TU_IP_LOCAL>:8000
   ```
3. Reinicia el empaquetador de Expo con la caché limpia (`npx expo start -c`) para que se cargue la nueva configuración.

### Opción B: Túnel Público con Ngrok (Recomendado - Salta restricciones de red y firewalls)
1. Descarga e instala [Ngrok](https://ngrok.com/).
2. Con tu backend corriendo en el puerto 8000, abre otra terminal y ejecuta el comando para levantar el túnel:
   ```bash
   ngrok http 8000
   ```
3. Copia la URL pública HTTPS que genera Ngrok (ej: `https://xxxx-xxxx-xxxx.ngrok-free.app`).
4. En el archivo `frontend/.env`, configura la variable apuntando a esa URL pública:
   ```env
   EXPO_PUBLIC_API_URL=https://xxxx-xxxx-xxxx.ngrok-free.app
   ```
5. Reinicia el empaquetador de Expo con caché limpia:
   ```bash
   npx expo start -c
   ```

---

## 🔒 Autenticación Básica (API Key)

Para asegurar las peticiones entrantes desde Azure sin la complejidad de OAuth en la fase de MVP, se implementa un header de seguridad:

- **Header Requerido:** `X-API-KEY`
- **Valor por defecto (desarrollo):** `dev-key-lunchmunch-123` (Configurable en la variable de entorno `AZURE_AGENT_API_KEY`)

*Cualquier petición que carezca de este header o tenga un valor incorrecto recibirá un error `401 Unauthorized`.*

---

## 🚦 Endpoints Expuestos

### 1. Autenticación (Registro de Usuario)
Crea un perfil de usuario junto con sus restricciones alimenticias y alérgenos iniciales.

- **Método:** `POST`
- **Ruta:** `/auth/register`
- **Headers:** 
  - `Content-Type: application/json`
  - `X-API-KEY: <tu-api-key>`
- **Cuerpo de la Petición (JSON):**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan.perez@example.com",
  "password": "mipasswordseguro",
  "alergias": ["maní", "pescado"],
  "objetivos_nutricionales": "Reducir consumo de sodio y aumentar proteínas"
}
```

- **Respuesta (201 Created):**
```json
{
  "usuario_id": "d3b07384-d113-4ecb-a5d6-ec260408544e",
  "status": "creado",
  "perfil": {
    "alergias": ["maní", "pescado"],
    "objetivos_nutricionales": "Reducir consumo de sodio y aumentar proteínas"
  }
}
```

---

### 2. Despensa: Crear un ingrediente (Pantry)
Agrega un nuevo ingrediente al inventario del usuario.

- **Método:** `POST`
- **Ruta:** `/pantry/`
- **Query Parameters:**
  - `usuario_id`: `d3b07384-d113-4ecb-a5d6-ec260408544e` (UUID del usuario)
- **Headers:** 
  - `Content-Type: application/json`
  - `X-API-KEY: <tu-api-key>`
- **Cuerpo de la Petición (JSON):**
```json
{
  "ingrediente": "Pechuga de Pollo",
  "cantidad": 500,
  "unidad": "gramos",
  "fecha_caducidad": "2026-07-20"
}
```

- **Respuesta (201 Created):**
```json
{
  "ingrediente": "Pechuga de Pollo",
  "cantidad": 500.0,
  "unidad": "gramos",
  "fecha_caducidad": "2026-07-20",
  "id": "7ac15bc2-e932-446b-8bf3-1a221f7db1f9",
  "usuario_id": "d3b07384-d113-4ecb-a5d6-ec260408544e"
}
```

---

### 3. Despensa: Listar ingredientes
Obtiene el inventario completo de la despensa de un usuario.

- **Método:** `GET`
- **Ruta:** `/pantry/{usuario_id}`
- **Headers:** 
  - `X-API-KEY: <tu-api-key>`
- **Respuesta (200 OK):**
```json
[
  {
    "ingrediente": "Pechuga de Pollo",
    "cantidad": 500.0,
    "unidad": "gramos",
    "fecha_caducidad": "2026-07-20",
    "id": "7ac15bc2-e932-446b-8bf3-1a221f7db1f9",
    "usuario_id": "d3b07384-d113-4ecb-a5d6-ec260408544e"
  }
]
```

---

### 4. Despensa: Actualizar un ingrediente
Modifica la cantidad, unidad o vencimiento de un ingrediente existente.

- **Método:** `PUT`
- **Ruta:** `/pantry/{item_id}`
- **Headers:** 
  - `Content-Type: application/json`
  - `X-API-KEY: <tu-api-key>`
- **Cuerpo de la Petición (JSON - todos los campos opcionales):**
```json
{
  "cantidad": 450,
  "fecha_caducidad": "2026-07-19"
}
```

- **Respuesta (200 OK):**
```json
{
  "ingrediente": "Pechuga de Pollo",
  "cantidad": 450.0,
  "unidad": "gramos",
  "fecha_caducidad": "2026-07-19",
  "id": "7ac15bc2-e932-446b-8bf3-1a221f7db1f9",
  "usuario_id": "d3b07384-d113-4ecb-a5d6-ec260408544e"
}
```

---

### 5. Despensa: Eliminar un ingrediente
Remueve un ingrediente de la base de datos física.

- **Método:** `DELETE`
- **Ruta:** `/pantry/{item_id}`
- **Headers:** 
  - `X-API-KEY: <tu-api-key>`
- **Respuesta (204 No Content):** (Sin cuerpo de respuesta)
