# LunchMunchAI 🥗

LunchMunchAI es un asistente inteligente diseñado para optimizar la preparación de alimentos cotidianos. Utilizando una arquitectura híbrida y moderna, permite a los usuarios gestionar su despensa digital, registrar restricciones alimenticias y alergias, y generar recetas personalizadas optimizando insumos perecibles mediante Inteligencia Artificial (Azure AI Foundry y Azure AI Search).

Este repositorio consolidado contiene tanto la aplicación móvil (**Frontend**) como el servicio de orquestación y base de datos (**Backend**).

---

## 📂 Estructura General del Proyecto

```text
/LunchMunchAI
├── /frontend      # Aplicación móvil en React Native (Expo + TypeScript)
├── /backend       # API REST asíncrona en FastAPI (Python + SQLModel)
├── /docs          # Especificaciones técnicas detalladas y bitácoras del proyecto
└── README.md      # Este archivo (Guía de entrada general)
```

---

## 💻 1. Frontend (React Native & Expo)

La interfaz móvil está construida con **React Native** usando **Expo**, estructurada con TypeScript, navegación por pestañas (`@react-navigation`), y gestión de estado con **Zustand**.

### Requisitos Previos (Frontend)
- **Node.js** (Versión 18 o superior recomendada)
- **npm** o **yarn**
- **Expo Go** instalado en tu dispositivo móvil (Android/iOS) para pruebas en vivo, o simuladores locales de Android/iOS.

### Configuración e Inicio Rápido (Frontend)
1. Navega a la carpeta frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias de Node:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo de Expo:
   ```bash
   npm run start
   ```
4. Escanea el código QR generado desde la app **Expo Go** en tu celular para ver e interactuar con la aplicación.

---

## ⚙️ 2. Backend (FastAPI & SQLModel)

El backend es una API asíncrona construida en **FastAPI** con **SQLModel** (ORM unificado con Pydantic) y control de versiones de base de datos relacional mediante **Alembic**.

### Requisitos Previos (Backend)
- **Python 3.11** o superior.
- Entorno de terminal compatible (PowerShell, CMD, Bash).

### Configuración e Inicio Rápido (Backend)
1. Navega a la carpeta backend:
   ```bash
   cd backend
   ```
2. Crea el entorno virtual (`.venv`):
   ```bash
   python -m venv .venv
   ```
3. Activa el entorno virtual:
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
4. Instala las dependencias requeridas:
   ```bash
   pip install -r requirements.txt
   ```
5. Configura las variables de entorno:
   - Copia el archivo `.env.example` y renómbralo a `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edita el archivo `.env` configurando tu clave secreta de API (`AZURE_AGENT_API_KEY`), credenciales de Azure AI y Google Maps.
6. Aplica las migraciones de base de datos para generar tu SQLite local (`lunchmunch.db`):
   ```bash
   alembic upgrade head
   ```
7. Inicia el servidor local de desarrollo:
   ```bash
   uvicorn app.main:app --reload
   ```

El servidor backend estará disponible en: [http://localhost:8000](http://localhost:8000)
- **Documentación Swagger Interactiva:** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## ⚡ Optimización del Rendimiento y Desarrollo Local

El sistema incorpora técnicas avanzadas para minimizar los tiempos de carga y mejorar la experiencia de usuario:

### 1. Estrategia de Caché Local y SWR (State-While-Revalidate)
* Los favoritos se almacenan en el estado global persistente de **Zustand** (`useAppStore`), persistido localmente en el dispositivo mediante `AsyncStorage`.
* Al entrar al perfil, los datos cacheados se muestran de manera instantánea (0ms percibidos). Al mismo tiempo, se inicia una consulta de red en segundo plano para refrescar la lista silenciosamente.

### 2. Actualizaciones Optimistas (Optimistic Updates)
* **Eliminación instantánea:** Al remover una receta favorita, la UI se actualiza inmediatamente (0ms) sin esperar a que el servidor ngrok responda. Si la llamada de red falla por conectividad, los datos locales se restauran y se le notifica al usuario.
* **Sincronización al guardar:** Al guardar una receta en favoritos desde la pantalla de detalle, esta se añade directamente a la caché en memoria de Zustand, permitiendo que esté disponible en la pantalla de Perfil antes de que se inicie cualquier sincronización por red.

### 3. Bypass de ngrok (Desarrollo Ultrarrápido)
* Si estás depurando en un emulador local o dispositivo físico conectado a la misma red Wi-Fi, evita usar ngrok. Ngrok añade un túnel sobre internet que incrementa la latencia en 200ms - 1s+.
* En su lugar, edita el archivo `frontend/.env` e introduce tu IP local en lugar del túnel:
  ```env
  EXPO_PUBLIC_API_URL=http://<TU_IP_LOCAL>:8000
  ```
  *(Ejemplo: `http://192.168.18.177:8000`)*. Esto reduce la latencia de red de ~1000ms a menos de **10ms** por petición.

---

## 🛠️ Desarrollo Colaborativo y Git

Cuando trabajes en tu rama local (por ejemplo, `backend-luis`) y vayas a subir cambios:
1. Comprueba los archivos modificados: `git status`
2. Prepáralos: `git add .`
3. Haz el commit asociando el código de la especificación técnica (ej. `FEAT-01`):
   ```bash
   git commit -m "FEAT-01: Implementar endpoints de autenticación y migraciones"
   ```
4. Sube la rama remota: `git push origin backend-luis`

---

## 📖 Documentación de Arquitectura e Integración

Para mayor detalle de especificaciones técnicas y flujos, consulta la carpeta `/docs`:
- [SYSTEM_ARCHITECTURE.md](file:///c:/Users/User/Documents/LunchMunchAI/docs/SYSTEM_ARCHITECTURE.md) - Arquitectura global del sistema y stack tecnológico.
- [SPEC_FEATURES.md](file:///c:/Users/User/Documents/LunchMunchAI/docs/SPEC_FEATURES.md) - Matriz de especificaciones funcionales y criterios de aceptación (SDD).
- [INTEGRATION_AZURE.md](file:///c:/Users/User/Documents/LunchMunchAI/docs/INTEGRATION_AZURE.md) - Contrato de endpoints y seguridad API Key para el Agente Externo de Azure AI.
- [AGENT_CONTEXT_LOG.md](file:///c:/Users/User/Documents/LunchMunchAI/docs/AGENT_CONTEXT_LOG.md) - Bitácora histórica del desarrollo y estado del proyecto.
