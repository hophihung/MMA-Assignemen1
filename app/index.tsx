import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.greeting, { color: theme.secondaryText }]}>Welcome back</Text>
        <Text style={[styles.title, { color: theme.text }]}>Your personal profile hub</Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>Keep your story up to date and make the profile yours.</Text>
      </View>
      <Pressable
        onPress={() => router.push('/profile')}
        style={[styles.ctaButton, { backgroundColor: theme.primary }]}
        android_ripple={{ color: theme.accent }}>
        <Text style={styles.ctaLabel}>View Profile</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'space-between',
  },
  content: {
    gap: 12,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '500',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  ctaButton: {
    paddingVertical: 16,
    borderRadius: 22,
    alignItems: 'center',
  },
  ctaLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
