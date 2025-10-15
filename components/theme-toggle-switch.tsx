import { StyleSheet, Switch, Text, View } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

type ThemeToggleSwitchProps = {
  label?: string;
};

export const ThemeToggleSwitch = ({ label = 'Dark Mode' }: ThemeToggleSwitchProps) => {
  const { mode, toggleTheme, theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      <Switch
        value={mode === 'dark'}
        onValueChange={toggleTheme}
        trackColor={{ false: '#CBD5F5', true: theme.primary }}
        thumbColor={mode === 'dark' ? theme.accent : '#FFFFFF'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 18,
    borderWidth: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
  },
});
