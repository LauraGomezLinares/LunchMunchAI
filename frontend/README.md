# LunchMunchAI Frontend

**Tu asistente inteligente de alimentación personalizada para días cargados.**

Un MVP de aplicación móvil desarrollado con React Native, Expo y TypeScript que resuelve la transición alimentaria urbana en Lima Metropolitana y Callao.

---

## 📋 Índice

- [Visión General](#visión-general)
- [Stack Tecnológico](#stack-tecnológico)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Arquitectura y Diseño](#arquitectura-y-diseño)
- [Paleta de Colores](#paleta-de-colores)
- [Flujo de Navegación](#flujo-de-navegación)
- [Características Principales](#características-principales)
- [Datos Mockeados](#datos-mockeados)
- [Integración Backend (Futuro)](#integración-backend-futuro)
- [Contribución](#contribución)
- [Licencia](#licencia)

---

## 🎯 Visión General

### Problemática
Alto consumo de alimentos ultraprocesados en jóvenes y adultos (18-40 años) de Lima Metropolitana y Callao debido a la falta de tiempo para planificar comidas con ingredientes disponibles en el hogar.

### Solución
LunchMunchAI es un asistente que:
- 📱 Gestiona un inventario personal de ingredientes (despensa)
- 🍽️ Sugiere recetas basadas en ingredientes disponibles
- 🏪 Localiza mercados cercanos con productos frescos
- ⚠️ Respeta restricciones dietéticas y alergias
- 💾 Persiste datos localmente en el dispositivo

### Público Objetivo
- **Edad:** 18-40 años
- **Ubicación:** Lima Metropolitana y Callao
- **Comportamiento:** Personas ocupadas que buscan comer mejor sin perder tiempo

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| **React Native** | 0.76.5 | Framework multiplataforma |
| **Expo** | ~52.0.0 | Plataforma de desarrollo y distribución |
| **TypeScript** | ^5.7.0 | Tipado estricto |
| **React Navigation** | ^6.0.0 | Navegación stack + bottom tabs |
| **Zustand** | ^5.0.0 | Estado global (store) |
| **React Hook Form** | ^7.0.0 | Gestión de formularios |
| **Zod** | ^3.0.0 | Validación de esquemas |
| **AsyncStorage** | ^2.1.0 | Persistencia local simulada |
| **Expo Linear Gradient** | ~14.0.0 | Fondos degradados |
| **Expo Vector Icons** | ^14.0.0 | Iconos de aplicación |
| **React Native Reanimated** | ~3.0.0 | Animaciones fluidas (opcional) |

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0 (o **yarn**, **pnpm**)
- **Expo CLI** (global o local)
- **Android Studio** o **Xcode** (para emuladores)

### Verificar versiones
```bash
node --version
npm --version
expo --version
```

---

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
cd d:\DesarrolloMovil\LunchMunchAI\frontend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Verificar tipos TypeScript
```bash
npm run typecheck
```

---

## 📜 Scripts Disponibles

### Desarrollo

```bash
# Iniciar servidor Expo (permite escanear QR desde Expo Go)
npm start

# Abrir en emulador Android
npm run android

# Abrir en emulador iOS (solo macOS)
npm run ios

# Abrir en navegador web
npm run web
```

### Calidad de Código

```bash
# Validar tipos TypeScript
npm run typecheck
```

---

## 📁 Estructura de Carpetas

```
frontend/
├── App.tsx                  # Entry point principal (SafeAreaProvider, StatusBar)
├── package.json             # Dependencias y scripts
├── tsconfig.json            # Configuración TypeScript
├── app.json                 # Configuración Expo
├── babel.config.js          # Configuración Babel
├── .gitignore               # Archivos ignorados por Git
│
└── src/
    ├── App.tsx              # Inicializador de store + RootNavigator
    │
    ├── components/
    │   ├── ui/
    │   │   └── Button.tsx           # Botón reutilizable (primary/secondary)
    │   └── features/
    │       └── RecipeCard.tsx       # Tarjeta de receta con imagen
    │
    ├── screens/             # Pantallas principales
    │   ├── auth/
    │   │   ├── LoginScreen.tsx      # Inicio de sesión (mock)
    │   │   └── RegisterScreen.tsx   # Registro (mock)
    │   ├── onboarding/
    │   │   ├── WelcomeScreen.tsx    # Pantalla de bienvenida
    │   │   └── DietaryProfileScreen.tsx # Configuración de alergias
    │   ├── home/
    │   │   └── HomeScreen.tsx       # Dashboard + receta sugerida
    │   ├── pantry/
    │   │   └── PantryScreen.tsx     # Gestión de despensa
    │   ├── recipes/
    │   │   ├── RecipesListScreen.tsx    # Listado de recetas
    │   │   └── RecipeDetailScreen.tsx   # Detalle de receta
    │   ├── map/
    │   │   └── MarketsScreen.tsx    # Mercados cercanos (mock)
    │   └── profile/
    │       └── ProfileScreen.tsx    # Datos usuario + cerrar sesión
    │
    ├── navigation/
    │   ├── AppNavigator.tsx     # Bottom Tabs: Home, Pantry, Recipes, Markets, Profile
    │   ├── AuthStack.tsx        # Stack: Login, Register
    │   └── OnboardingStack.tsx  # Stack: Welcome, DietaryProfile
    │
    ├── store/
    │   └── useAppStore.ts       # Zustand: estado global + persistencia
    │
    ├── services/
    │   └── api/
    │       ├── auth.ts          # Autenticación mock (TODO: conectar a FastAPI)
    │       └── recipes.ts       # Recetas mock (TODO: conectar a FastAPI)
    │
    ├── mocks/
    │   └── recipes.ts           # Datos simulados: recetas, ingredientes, mercados
    │
    ├── constants/
    │   ├── colors.ts            # Paleta de colores (Fresh & Vital)
    │   └── typography.ts        # Tipografía: títulos, cuerpo, captions
    │
    ├── types/
    │   └── index.ts             # Interfaces TypeScript globales
    │
    └── utils/
        └── (validadores, formateadores)

```

---

## 🎨 Arquitectura y Diseño

### Principios de Diseño

1. **Componentización:** Átomos (Button) → Moléculas (RecipeCard) → Organismos (Screens)
2. **Tipado Estricto:** TypeScript con `strict: true`
3. **Estado Global:** Zustand con persistencia en AsyncStorage
4. **Accesibilidad:** Contrastes WCAG AA, touch targets ≥ 44px
5. **Animaciones Sutiles:** Transiciones y microinteracciones con Reanimated

### Flujo de Datos

```
App.tsx (SafeAreaProvider)
  ↓
src/App.tsx (useAppStore initialize)
  ↓
RootStack.Navigator
  ├─ Onboarding (si onboardingComplete = false)
  ├─ Auth (si isAuthenticated = false)
  └─ MainApp/AppNavigator (si authenticated)
```

---

## 🌈 Paleta de Colores

### Fresh & Vital Theme
Evoca frescura alimentaria, vitalidad y confianza tecnológica.

| Color | Código | Propósito |
|---|---|---|
| **Primary** | #2D9F6F | Verde salvia (botones principales, fondo hero) |
| **Primary Dark** | #1E7A52 | Verde profundo (acentos, CTA secundarios) |
| **Secondary** | #FF7A59 | Coral vibrante (apetito, energía) |
| **Secondary Light** | #FFA589 | Coral suave (hover, estados activos) |
| **Accent** | #FFC857 | Amarillo mostaza (destacados, alertas) |
| **Background** | #FAF7F2 | Crema cálido (fondo principal) |
| **Surface** | #FFFFFF | Blanco puro (tarjetas, modales) |
| **Text Primary** | #1A2E2A | Verde casi negro (texto alto contraste) |
| **Text Secondary** | #5C6B66 | Gris verdoso (texto secundario) |
| **Text Muted** | #9AA3A0 | Gris apagado (placeholders) |
| **Border** | #E5E0D6 | Borde sutil |
| **Error** | #E63946 | Rojo alerta (alérgenos) |

### Tipografía
- **Títulos:** Poppins SemiBold/Bold, geometría moderna
- **Cuerpo:** Inter Regular/Medium, optimizada para pantallas

---

## 🗺️ Flujo de Navegación

### 1. **Splash → Onboarding** (Primera ejecución)
```
WelcomeScreen
  ↓ "Comenzar"
  ↓
DietaryProfileScreen (seleccionar alergias)
  ↓ "Guardar perfil"
  ↓
LoginScreen
```

### 2. **Autenticación**
```
LoginScreen (email: demo@lunchmunch.ai, password: 123456)
  ├─ Acción: Validar contra mock
  ├─ Guardar token en AsyncStorage
  └─ Navegar a MainTabs
```

### 3. **Aplicación Principal**
```
Bottom Tabs:
├─ Home (Dashboard + receta sugerida)
├─ Pantry (Gestión de ingredientes)
├─ Recipes
│  ├─ RecipesList (Grid de recetas)
│  └─ RecipeDetail (Pasos, nutrición, ingredientes faltantes)
├─ Markets (Mercados cercanos - mock)
└─ Profile (Datos usuario + alergias + cerrar sesión)
```

---

## ✨ Características Principales

### 🏠 Home Screen
- Dashboard personalizado con saludo
- Contador de ingredientes en despensa
- Receta del día sugerida
- Acceso rápido a otras secciones

### 🛒 Pantry Screen
- Listado completo de ingredientes disponibles
- Añadir/eliminar ingredientes
- Categorías (Verduras, Proteínas, Granos, Lácteos)
- Persistencia local con AsyncStorage

### 🍽️ Recipes Screen
- Grid de recetas mockeadas
- Información: tiempo, calorías, categoría
- Badge de incompatibilidad (alérgenos)
- Detalle expandido con pasos y nutrición
- Botón "Ingredientes faltantes" (placeholder)

### 🗺️ Markets Screen
- Lista simulada de mercados en Lima/Callao
- Coordenadas geográficas estáticas
- Dirección y nombre de cada mercado
- Preparado para integración con Google Maps API

### 👤 Profile Screen
- Datos del usuario (nombre, correo, alergias)
- Edición de preferencias
- Cerrar sesión

---

## 💾 Datos Mockeados

### Ubicación: `src/mocks/recipes.ts`

#### Ingredientes
```typescript
mockIngredients: Ingredient[]
- Tomate, Aguacate, Tortilla de maíz, Pollo, Arroz, Queso fresco
```

#### Recetas
```typescript
mockRecipes: Recipe[]
1. Bowl de quinoa saludable (20 min, 480 kcal)
2. Tacos de pollo con salsa (15 min, 520 kcal)
3. Ensalada rápida de atún (10 min, 360 kcal)
```

#### Mercados
```typescript
mockMarkets: Market[]
1. Mercado Santa Anita (-12.0464, -77.0428)
2. Mercado de Surquillo (-12.1200, -77.0300)
3. Mercado de San Miguel (-12.0760, -77.0860)
```

---

## 🔌 Integración Backend (Futuro)

Todos los servicios están comentados con `TODO` indicando puntos de conexión:

### Autenticación
**Archivo:** `src/services/api/auth.ts`
```typescript
// TODO: conectar a FastAPI endpoint /auth/login
// Actualmente: mock con email demo@lunchmunch.ai, password 123456
```

### Recetas
**Archivo:** `src/services/api/recipes.ts`
```typescript
// TODO: conectar a FastAPI endpoint /recipes/recommend
// Actualmente: datos mockeados con latencia simulada (500ms)
```

### Estructura esperada del backend

```
FastAPI Backend (Puerto 8000)
├── /auth/login                      # POST: email + password → token
├── /auth/register                   # POST: crear usuario
├── /recipes/recommend               # GET: recetas por ingredientes
├── /recipes/{id}                    # GET: detalle de receta
├── /pantry/add                      # POST: agregar ingrediente
├── /pantry/remove                   # DELETE: quitar ingrediente
├── /markets/nearby                  # GET: mercados cercanos
├── /user/profile                    # GET/PUT: datos usuario
└── /user/allergies                  # PUT: actualizar alergias
```

---

## 🚀 Próximos Pasos (Roadmap)

### Fase 1: MVP Frontend (✅ Completado)
- [x] Estructura Expo + TypeScript
- [x] Navegación stack + tabs
- [x] Pantallas principales funcionales
- [x] Diseño visual con paleta personalizada
- [x] Datos mockeados
- [x] Zustand + AsyncStorage

### Fase 2: Backend Integration
- [ ] Conectar FastAPI
- [ ] Autenticación real con JWT
- [ ] Sincronización de pantry en base de datos
- [ ] Recomendación de recetas con IA

### Fase 3: Funcionalidades Avanzadas
- [ ] Integración Google Maps API (mercados reales)
- [ ] Cálculo nutricional automático
- [ ] Historial de recetas
- [ ] Exportar lista de compras (PDF/CSV)

### Fase 4: Optimización
- [ ] Testing unitario (Jest + React Native Testing Library)
- [ ] E2E testing (Detox)
- [ ] Animaciones con Reanimated
- [ ] Deep linking
- [ ] Push notifications

---

## 📝 Guía de Desarrollo

### Agregar una nueva pantalla

1. **Crear archivo en `src/screens/`**
```typescript
// src/screens/newfeature/NewFeatureScreen.tsx
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';

export default function NewFeatureScreen() {
  return <SafeAreaView>{/* Contenido */}</SafeAreaView>;
}
```

2. **Registrar en navegación**
```typescript
// src/navigation/AppNavigator.tsx
<Tab.Screen name="NewFeature" component={NewFeatureScreen} />
```

### Agregar un componente reutilizable

1. **Crear en `src/components/ui/` o `src/components/features/`**
```typescript
export default function MyComponent(props: Props) {
  return <View>{/* JSX */}</View>;
}
```

2. **Tipar props con TypeScript**
```typescript
type Props = {
  title: string;
  onPress: () => void;
};
```

### Actualizar estado global

```typescript
import { useAppStore } from '../../store/useAppStore';

// En componente
const user = useAppStore((state) => state.user);
const login = useAppStore((state) => state.login);
```

---

## 🧪 Testing (Preparado para futuro)

```bash
# Unit tests (Jest)
npm test

# E2E tests (Detox)
npm run test:e2e
```

---

## 📱 Compatibilidad

| Plataforma | Versión Mínima | Estado |
|---|---|---|
| **Android** | 6.0 (API 23) | ✅ Soportado |
| **iOS** | 13.0 | ✅ Soportado |
| **Web** | (Expo Web) | ⚠️ Experimental |

---

## 🐛 Solución de Problemas

### Problema: Metro bundler no inicia
```bash
npm start -- --reset-cache
```

### Problema: Caché antiguo en Expo
```bash
npm start -- --clear
```

### Problema: Puerto 8081 en uso
```bash
expo start -c
```

### Problema: Errores de tipos TypeScript
```bash
npm run typecheck
```

---

## 📚 Recursos Útiles

- [React Native Docs](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 👥 Contribución

1. Crea una rama desde `main`:
   ```bash
   git checkout -b feature/mi-feature
   ```

2. Realiza tus cambios con commits descriptivos:
   ```bash
   git commit -m "feat: agregar nueva pantalla de X"
   ```

3. Asegúrate de pasar validación TypeScript:
   ```bash
   npm run typecheck
   ```

4. Abre un pull request

---

## 📄 Licencia

Este proyecto es parte de **LunchMunchAI**.

---

## 📞 Contacto

Para preguntas o sugerencias sobre el frontend:
- 📧 Email: dev@lunchmunchai.com
- 🐙 GitHub Issues: [LunchMunchAI/frontend/issues](https://github.com/)

---

**Última actualización:** Julio 2026 | **Versión:** 1.0.0-mvp
