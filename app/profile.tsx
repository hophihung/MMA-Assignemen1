import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ProfileCard } from '@/components/profile-card';
import { useProfile } from '@/contexts/ProfileContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { profile } = useProfile();
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}>
      <ProfileCard
        name={profile.name}
        bio={profile.bio}
        avatar={profile.avatar}
        onEdit={() => router.push('/edit-profile')}
        onSettings={() => router.push('/settings')}
      />
  <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Highlights</Text>
        <View style={styles.highlight}>
          <Text style={[styles.highlightLabel, { color: theme.secondaryText }]}>Role</Text>
          <Text style={[styles.highlightValue, { color: theme.text }]}>Lead Product Designer</Text>
        </View>
        <View style={styles.highlight}>
          <Text style={[styles.highlightLabel, { color: theme.secondaryText }]}>Location</Text>
          <Text style={[styles.highlightValue, { color: theme.text }]}>San Francisco, USA</Text>
        </View>
        <View style={styles.highlight}>
          <Text style={[styles.highlightLabel, { color: theme.secondaryText }]}>Focus</Text>
          <Text style={[styles.highlightValue, { color: theme.text }]}>Design systems · Accessibility · Collaboration</Text>
        </View>
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
  section: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  highlight: {
    gap: 4,
  },
  highlightLabel: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  highlightValue: {
    fontSize: 16,
    lineHeight: 22,
  },
});
