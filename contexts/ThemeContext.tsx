import React, { createContext, useContext, useMemo, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

export type AppTheme = {
  background: string;
  card: string;
  text: string;
  secondaryText: string;
  primary: string;
  accent: string;
  border: string;
  inputBackground: string;
};

const lightTheme: AppTheme = {
  background: '#F5F5F5',
  card: '#FFFFFF',
  text: '#1F2933',
  secondaryText: '#52606D',
  primary: '#3B82F6',
  accent: '#F59E0B',
  border: '#E2E8F0',
  inputBackground: '#FFFFFF',
};

const darkTheme: AppTheme = {
  background: '#0F172A',
  card: '#111827',
  text: '#F1F5F9',
  secondaryText: '#94A3B8',
  primary: '#60A5FA',
  accent: '#FBBF24',
  border: '#1E293B',
  inputBackground: '#1E293B',
};

type ThemeContextValue = {
  mode: ThemeMode;
  theme: AppTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(
    () => ({
      mode,
      theme: mode === 'light' ? lightTheme : darkTheme,
      toggleTheme,
    }),
    [mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
