import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ThemeToggleSwitch } from '@/components/theme-toggle-switch';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsScreen() {
  const { theme } = useTheme();
  const upcomingPreferences = useMemo(
    () => [
      { label: 'Weekly recap emails', caption: 'A digest with highlights from collaborators.' },
      { label: 'Project nudges', caption: 'Friendly reminders when it is time to refresh your profile.' },
      { label: 'Public profile preview', caption: 'Control what external partners can read.' },
    ],
    [],
  );

  const palette = useMemo(() => [theme.primary, theme.accent, theme.surface], [theme]);

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.text }]}>Appearance</Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>Switch themes to see the profile update instantly.</Text>
        <ThemeToggleSwitch label="Dark Mode" />
        <View style={styles.paletteRow}>
          {palette.map((color) => (
            <View key={color} style={[styles.paletteSwatch, { backgroundColor: color }]} />
          ))}
        </View>
        <Text style={[styles.helper, { color: theme.secondaryText }]}>Palette preview updates as soon as you change themes.</Text>
      </View>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.text }]}>Notifications</Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>Stay tuned! More preferences are coming soon.</Text>
        <View style={styles.preferenceList}>
          {upcomingPreferences.map((item) => (
            <Pressable
              key={item.label}
              style={[styles.preferenceItem, { borderColor: theme.border, backgroundColor: theme.surface }]}
              android_ripple={{ color: theme.muted }}>
              <Text style={[styles.preferenceLabel, { color: theme.text }]}>{item.label}</Text>
              <Text style={[styles.preferenceCaption, { color: theme.secondaryText }]}>{item.caption}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={[styles.helper, { color: theme.secondaryText }]}>We will notify you as soon as these features land.</Text>
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
  helper: {
    fontSize: 13,
    lineHeight: 18,
  },
  paletteRow: {
    flexDirection: 'row',
    gap: 10,
  },
  paletteSwatch: {
    width: 44,
    height: 44,
    borderRadius: 16,
  },
  preferenceList: {
    gap: 12,
  },
  preferenceItem: {
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    gap: 4,
  },
  preferenceLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  preferenceCaption: {
    fontSize: 13,
    lineHeight: 20,
  },
});
