import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ThemeToggleSwitch } from '@/components/theme-toggle-switch';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.text }]}>Appearance</Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>Switch themes to see the profile update instantly.</Text>
        <ThemeToggleSwitch label="Dark Mode" />
      </View>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.text }]}>Notifications</Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>Stay tuned! More preferences are coming soon.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 24,
    gap: 24,
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
});
