# LunchMunchAI - Backend Service

Este es el servicio backend para **LunchMunchAI**, desarrollado utilizando **FastAPI** y estructurado con un enfoque asíncrono para orquestar la comunicación entre el aplicativo móvil (React Native), el motor de inteligencia artificial (Azure AI Foundry y Azure AI Search), y los servicios de base de datos y geolocalización.

---

## 🚀 Requisitos Previos

Asegúrate de tener instalado en tu sistema:
- **Python 3.11** o superior.
- **Git** para el control de versiones.

---

## 🛠️ Configuración e Instalación Paso a Paso

Sigue estos pasos en tu terminal para preparar el entorno virtual e instalar las librerías necesarias:

### 1. Clonar y posicionarse en la rama de desarrollo
```bash
git checkout backend-luis
```

### 2. Crear el entorno virtual (`.venv`)
Dentro de la carpeta raíz del proyecto, ejecuta el siguiente comando:
```bash
python -m venv .venv
```

### 3. Activar el entorno virtual
- **En Windows (PowerShell):**
  ```powershell
  .venv\Scripts\Activate.ps1
  ```
- **En Windows (CMD):**
  ```cmd
  .venv\Scripts\activate.bat
  ```
- **En macOS / Linux:**
  ```bash
  source .venv/bin/activate
  ```

### 4. Instalar Dependencias
Una vez activado el entorno virtual, instala las dependencias necesarias:
```bash
pip install -r backend/requirements.txt
```

### 5. Configurar Variables de Entorno
Copia el archivo de plantilla `.env.example` y renómbralo a `.env`:
```bash
cp backend/.env.example backend/.env
```
*Edita el archivo `backend/.env` con tus credenciales locales de Azure, API keys de Google Maps, etc.*

---

## 🏃 Ejecución del Servidor de Desarrollo

Para iniciar el servidor local de desarrollo con recarga automática, ejecuta:

```bash
cd backend
uvicorn app.main:app --reload
```

El servidor estará disponible en: [http://localhost:8000](http://localhost:8000)

### 📖 Documentación Interactiva de la API
FastAPI genera documentación automática de forma nativa. Puedes acceder a ella a través de:
- **Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs) (Permite probar los endpoints en vivo)
- **ReDoc:** [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 📂 Estructura del Backend
- `/backend/app/main.py`: Punto de entrada de la aplicación.
- `/backend/app/core/config.py`: Validación de variables de entorno mediante `pydantic-settings`.
- `/backend/app/db/session.py`: Configuración de sesiones asíncronas para Azure SQL/SQLite.
- `/backend/app/models/`: Modelos de datos y esquemas de base de datos.
- `/backend/app/routers/`: Enrutadores independientes de la API (`auth`, `pantry`, `recipes`, `markets`).
- `/backend/app/services/`: Clientes de comunicación externa (Azure AI, Google Maps, Image Compression).

---

## 🌐 Manual Corto de Git para Subir Cambios

Cuando completes tus modificaciones en tu entorno local y desees enviarlas a GitHub bajo tu rama de trabajo `backend-luis`, sigue estos comandos:

### 1. Verificar archivos modificados y nuevos
```bash
git status
```

### 2. Agregar los cambios al área de preparación (Staging)
Para agregar archivos específicos:
```bash
git add backend/app/routers/auth.py
```
O para agregar todos los cambios y archivos nuevos:
```bash
git add .
```

### 3. Crear el Commit con un mensaje descriptivo
*(Recuerda referenciar el ID de la feature bajo la cual estás trabajando en la descripción del commit)*
```bash
git commit -m "FEAT-01: Implementar base de routers y configuración del backend"
```

### 4. Enviar los cambios a tu rama en el repositorio remoto
```bash
git push origin backend-luis
```
*(Si es la primera vez que subes la rama, usa `git push -u origin backend-luis`)*
