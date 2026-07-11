import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthStore } from '../store/authStore';
import { RouteNames } from '../constants/routes';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import DietaryProfileScreen from '../screens/onboarding/DietaryProfileScreen';
import HomeScreen from '../screens/home/HomeScreen';
import PantryScreen from '../screens/pantry/PantryScreen';
import RecipesListScreen from '../screens/recipes/RecipesListScreen';
import RecipeDetailScreen from '../screens/recipes/RecipeDetailScreen';
import NearbyMarketsScreen from '../screens/map/NearbyMarketsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  [RouteNames.Splash]: undefined;
  [RouteNames.Onboarding]: undefined;
  [RouteNames.Login]: undefined;
  [RouteNames.Register]: undefined;
  [RouteNames.DietaryProfile]: undefined;
  [RouteNames.Home]: undefined;
  [RouteNames.Pantry]: undefined;
  [RouteNames.Recipes]: undefined;
  [RouteNames.RecipeDetail]: { recipeId: string };
  [RouteNames.Markets]: undefined;
  [RouteNames.Profile]: undefined;
};

type MainTabParamList = {
  [RouteNames.Home]: undefined;
  [RouteNames.Pantry]: undefined;
  [RouteNames.Recipes]: undefined;
  [RouteNames.Markets]: undefined;
  [RouteNames.Profile]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName={RouteNames.Home}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { height: 70, paddingBottom: 8, backgroundColor: '#fff' },
        tabBarActiveTintColor: '#2D9F6F',
        tabBarInactiveTintColor: '#5C6B66',
        tabBarIcon: ({ focused, color, size }) => {
          const icons: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
            [RouteNames.Home]: 'home-outline',
            [RouteNames.Pantry]: 'basket-outline',
            [RouteNames.Recipes]: 'fast-food-outline',
            [RouteNames.Markets]: 'map-outline',
            [RouteNames.Profile]: 'person-circle-outline',
          };
          const iconName = icons[route.name as keyof MainTabParamList] ?? 'ellipse-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={RouteNames.Home} component={HomeScreen} options={{ title: 'Inicio' }} />
      <Tab.Screen name={RouteNames.Pantry} component={PantryScreen} options={{ title: 'Despensa' }} />
      <Tab.Screen name={RouteNames.Recipes} component={RecipesListScreen} options={{ title: 'Recetas' }} />
      <Tab.Screen name={RouteNames.Markets} component={NearbyMarketsScreen} options={{ title: 'Mercados' }} />
      <Tab.Screen name={RouteNames.Profile} component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { token, loading, onboardCompleted } = useAuthStore();
  const [initialRoute, setInitialRoute] = useState(RouteNames.Splash);

  useEffect(() => {
    if (!loading) {
      if (!token) {
        setInitialRoute(RouteNames.Onboarding);
      } else if (!onboardCompleted) {
        setInitialRoute(RouteNames.DietaryProfile);
      } else {
        setInitialRoute(RouteNames.Home);
      }
    }
  }, [token, loading, onboardCompleted]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
      <Stack.Screen name={RouteNames.Splash} component={SplashScreen} />
      <Stack.Screen name={RouteNames.Onboarding} component={OnboardingScreen} />
      <Stack.Screen name={RouteNames.Login} component={LoginScreen} />
      <Stack.Screen name={RouteNames.Register} component={RegisterScreen} />
      <Stack.Screen name={RouteNames.DietaryProfile} component={DietaryProfileScreen} />
      <Stack.Screen name={RouteNames.Home} component={MainTabs} />
      <Stack.Screen name={RouteNames.RecipeDetail} component={RecipeDetailScreen} />
    </Stack.Navigator>
  );
}
