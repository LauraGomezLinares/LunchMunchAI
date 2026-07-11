import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/home/HomeScreen';
import PantryScreen from '../screens/pantry/PantryScreen';
import RecipesListScreen from '../screens/recipes/RecipesListScreen';
import RecipeDetailScreen from '../screens/recipes/RecipeDetailScreen';
import MarketsScreen from '../screens/map/MarketsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();
const RecipesStack = createNativeStackNavigator();

function RecipesStackScreen() {
  return (
    <RecipesStack.Navigator>
      <RecipesStack.Screen name="RecipesList" component={RecipesListScreen} options={{ title: 'Recetas' }} />
      <RecipesStack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ title: 'Detalle' }} />
    </RecipesStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.textMuted,
      tabBarStyle: { backgroundColor: COLORS.surface, borderTopColor: COLORS.border },
      tabBarIcon: ({ color, size }) => {
        const iconName = route.name === 'Home' ? 'home' : route.name === 'Pantry' ? 'basket' : route.name === 'Recipes' ? 'restaurant' : route.name === 'Markets' ? 'map' : 'person';
        return <Ionicons name={iconName as any} size={size} color={color} />;
      },
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Pantry" component={PantryScreen} />
      <Tab.Screen name="Recipes" component={RecipesStackScreen} />
      <Tab.Screen name="Markets" component={MarketsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
