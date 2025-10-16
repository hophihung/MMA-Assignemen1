import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useProfile } from '@/contexts/ProfileContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { profile } = useProfile();

  const heroShadow = useMemo(() => {
    const platformShadow = Platform.select({
      ios: {
        shadowColor: theme.shadow,
        shadowOpacity: 0.18,
        shadowRadius: 28,
        shadowOffset: { width: 0, height: 16 },
      },
      android: {
        elevation: 12,
      },
      default: {},
    });

    return platformShadow ?? {};
  }, [theme.shadow]);

  const insightCards = useMemo(
    () => [
      { label: 'Projects shipped', value: '24' },
      { label: 'Avg. rating', value: '4.9/5' },
      { label: 'Speaking events', value: '12' },
    ],
    [],
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}> 
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.heroCard, { backgroundColor: theme.primary }, heroShadow]}>
          <Text style={styles.heroEyebrow}>Hello, {profile.name.split(' ')[0] ?? profile.name}</Text>
          <Text style={styles.heroTitle}>Craft your evolving profile</Text>
          <Text style={styles.heroSubtitle}>
            Keep your story current, toggle themes to match your mood, and share highlights in seconds.
          </Text>
          <View style={styles.heroButtons}>
            <Pressable
              onPress={() => router.push('/profile')}
              style={styles.heroPrimaryButton}
              android_ripple={{ color: 'rgba(255,255,255,0.3)' }}>
              <Text style={styles.heroPrimaryLabel}>View profile</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push('/edit-profile')}
              style={[styles.heroSecondaryButton, { backgroundColor: theme.card, borderColor: theme.border }]}
              android_ripple={{ color: 'rgba(15,23,42,0.1)' }}>
              <Text style={[styles.heroSecondaryLabel, { color: theme.text }]}>Quick edit</Text>
            </Pressable>
          </View>
        </View>

        <View style={[styles.surfaceCard, { backgroundColor: theme.card, borderColor: theme.border }]}> 
          <Text style={[styles.surfaceTitle, { color: theme.text }]}>Why people check in here</Text>
          <Text style={[styles.surfaceSubtitle, { color: theme.secondaryText }]}>
            Capture new milestones and let collaborators see what you are working on without scrolling through endless threads.
          </Text>
          <View style={styles.surfaceActions}>
            <Pressable
              onPress={() => router.push('/settings')}
              style={[styles.surfaceButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
              android_ripple={{ color: theme.muted }}>
              <Text style={[styles.surfaceButtonLabel, { color: theme.text }]}>Theme settings</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push('/edit-profile')}
              style={[styles.surfaceButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
              android_ripple={{ color: theme.muted }}>
              <Text style={[styles.surfaceButtonLabel, { color: theme.text }]}>Update bio</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.insightGrid}>
          {insightCards.map((card) => (
            <View
              key={card.label}
              style={[styles.insightCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
            >
              <Text style={[styles.insightValue, { color: theme.text }]}>{card.value}</Text>
              <Text style={[styles.insightLabel, { color: theme.secondaryText }]}>{card.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 28,
  },
  heroCard: {
    borderRadius: 32,
    padding: 28,
    gap: 16,
  },
  heroEyebrow: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 16,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 36,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 16,
    lineHeight: 24,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  heroPrimaryButton: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(15,15,26,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  heroPrimaryLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  heroSecondaryButton: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  heroSecondaryLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  surfaceCard: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 24,
    gap: 16,
  },
  surfaceTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  surfaceSubtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  surfaceActions: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  surfaceButton: {
    flexBasis: '48%',
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  surfaceButtonLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  insightGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  insightCard: {
    flexBasis: '48%',
    minWidth: 152,
    borderWidth: 1,
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 8,
  },
  insightValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  insightLabel: {
    fontSize: 13,
    lineHeight: 18,
  },
});
