# LunchMunchAI — Frontend (Expo + React Native + TypeScript)

Este directorio contiene la aplicación frontend del proyecto LunchMunchAI, construida con Expo, React Native y TypeScript. Este README explica los requisitos, pasos de instalación, comandos de desarrollo, estructura del proyecto y soluciones a problemas comunes.

**Requisitos**
- Node.js LTS (recomendado 18.x o 20.x). Comprueba con `node -v`.
- npm (incluido con Node) o `yarn` si prefieres.
- Expo CLI (opcional globalmente): `npm install -g expo-cli` o usar `npx expo`.
- Git para control de versiones.
- Opcional: una cuenta de Expo para publicar o usar el cliente Expo Go.

**Dependencias clave**
- `expo` (SDK compatible con la versión usada en el proyecto)
- `react-native` (via Expo)
- `typescript` y `@types/*` para tipado
- `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`
- `zustand` (estado), `react-hook-form`, `zod` (validación)
- `@expo/vector-icons`, `expo-linear-gradient`, `@react-native-async-storage/async-storage`

Nota: las versiones exactas están en `package.json` del mismo directorio; revisa ahí para compatibilidad.

**Instalación (local)**
1. Abrir terminal en este directorio:

```bash
cd frontend
```

2. Instala dependencias (usa npm o yarn):

```bash
npm install
# o
# yarn install
```

3. (Opcional) Si prefieres usar Expo CLI global:

```bash
npm install -g expo-cli
```

**Comandos útiles**
- Iniciar servidor de desarrollo (Metro + Expo):

```bash
npm start
# o
# expo start
```

- Iniciar la app en un emulador/dispositivo (desde el panel de Expo o usando shortcuts):
  - Escanea el QR con Expo Go en tu teléfono
  - O usa `a` (Android emulator) o `i` (iOS simulator) en la consola de Expo

- Ejecutar TypeScript check:

```bash
npm run typecheck
# script: "tsc --noEmit"
```

- Lint (si está configurado):

```bash
npm run lint
```

- Build / publicacion (depende del flujo de Expo):

```bash
# usando EAS (recomendado para builds nativas)
# configurar EAS y luego:
eas build
```

**Variables y configuraciones**
- No se requieren secretos obligatorios para ejecutar en modo mock. Si introduces variables (API keys), crea un archivo `.env` o sigue el patrón que el proyecto implemente.

**Estructura principal del proyecto**
- `src/`
  - `screens/` — pantallas principales (Home, Recipes, Pantry, Auth, Profile...)
  - `navigation/` — configuraciones de navegación (stack y tabs)
  - `components/` — componentes UI reutilizables
  - `constants/` — colores, tipografías y rutas
  - `services/` — servicios y mock API
  - `store/` — estado (Zustand)
  - `mocks/` — datos mock para desarrollo
  - `types/` — definiciones TypeScript

**Sugerencias de desarrollo**
- Si el TypeScript server muestra advertencias sobre opciones obsoletas (p. ej. `moduleResolution` o `baseUrl`), el proyecto ya incluye `ignoreDeprecations` para silenciarlas; asegura que tu VS Code esté recargando el proyecto (Comando: "TypeScript: Restart TS Server").
- Si hay problemas con alias de paths (`@components`, `@screens`, etc.), verifica que tu editor respete `tsconfig.json` y que `babel.config.js`/Metro estén configurados para resolver los mismos alias.
- Para depuración rápida de problemas con imports, ejecuta:

```bash
npm run typecheck
# y
node -e "console.log(require('./package.json').name)"
```

**Problemas comunes y soluciones rápidas**
- "No inputs were found in config file": puede aparecer si VS Code está apuntando a un `tsconfig.json` diferente o a un subproyecto inexistente. Solución: reinicia el TS server en VS Code (`Ctrl+Shift+P` → "TypeScript: Restart TS Server") y asegúrate de abrir la raíz `frontend`.
- Errores de iconos (`Ionicons`): si TypeScript marca `name` como incompatible, usa un cast temporal `as any` o actualiza `@expo/vector-icons` para que coincida con las definiciones de tipos.
- Conflictos de dependencias: usar `npm install --legacy-peer-deps` puede ayudar en caso de errores de peer deps al instalar.

**Comprobaciones y pasos post-instalación**
1. Ejecuta `npm run typecheck` y corrige los errores de tipado reportados.
2. Ejecuta `npm start` y abre la app en Expo Go o emulador.
3. Revisa `src/mocks/` si quieres ajustar datos para pruebas.

**Contacto / Documentación adicional**
- Documentación del proyecto central: ver carpeta raíz `docs/`.
- Si quieres que automatice la ejecución de `npm run typecheck` y `npm start`, dímelo y lo hago desde aquí.

