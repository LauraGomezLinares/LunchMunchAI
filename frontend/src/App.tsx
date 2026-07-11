import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './navigation/AppNavigator';
import AuthStack from './navigation/AuthStack';
import OnboardingStack from './navigation/OnboardingStack';
import { useAppStore } from './store/useAppStore';
import { COLORS } from './constants/colors';

const RootStack = createNativeStackNavigator();

export default function App() {
  const { isAuthenticated, onboardingComplete, initialize, isHydrated } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const persistedState = await AsyncStorage.getItem('lunchmunchai-store');
        if (persistedState) {
          const parsed = JSON.parse(persistedState);
          initialize(parsed);
        } else {
          initialize(undefined);
        }
      } catch (error) {
        console.warn('Failed to restore store', error);
        initialize(undefined);
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, [initialize]);

  if (loading || !isHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!onboardingComplete ? (
          <RootStack.Screen name="Onboarding" component={OnboardingStack} />
        ) : !isAuthenticated ? (
          <RootStack.Screen name="Auth" component={AuthStack} />
        ) : (
          <RootStack.Screen name="MainApp" component={AppNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
