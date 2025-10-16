import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider, Theme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import 'react-native-reanimated';

import { ProfileProvider } from '@/contexts/ProfileContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

function AppNavigation() {
  const { mode, theme } = useTheme();

  const navigationTheme = useMemo<Theme>(() => {
    const baseTheme = mode === 'dark' ? DarkTheme : DefaultTheme;

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        primary: theme.primary,
        background: theme.background,
        card: theme.card,
        text: theme.text,
        border: theme.border,
        notification: theme.accent,
      },
    };
  }, [mode, theme]);

  return (
    <NavigationThemeProvider value={navigationTheme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.card },
          headerTintColor: theme.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: theme.background },
          headerTitleStyle: { fontSize: 18, fontWeight: '700' },
          headerTitleAlign: 'left',
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="profile" options={{ title: 'Profile' }} />
        <Stack.Screen name="edit-profile" options={{ title: 'Edit Profile' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
      </Stack>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <AppNavigation />
      </ProfileProvider>
    </ThemeProvider>
  );
}
