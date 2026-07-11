import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import DietaryProfileScreen from '../screens/onboarding/DietaryProfileScreen';

const Stack = createNativeStackNavigator();

export default function OnboardingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Bienvenid@' }} />
      <Stack.Screen name="DietaryProfile" component={DietaryProfileScreen} options={{ title: 'Perfil' }} />
    </Stack.Navigator>
  );
}
