import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ProfileCard } from '@/components/profile-card';
import { useProfile } from '@/contexts/ProfileContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { profile } = useProfile();
  const { theme } = useTheme();

  const highlights = useMemo(
    () => [
      { label: 'Role', value: 'Lead Product Designer' },
      { label: 'Location', value: 'San Francisco, USA' },
      { label: 'Focus', value: 'Design systems · Accessibility · Collaboration' },
    ],
    [],
  );

  const skillTags = useMemo(
    () => ['Design ops', 'Research synthesis', 'Design leadership', 'Workshop facilitation'],
    [],
  );

  const milestones = useMemo(
    () => [
      { year: '2025', detail: 'Shipped new design system for Polaris platform' },
      { year: '2024', detail: 'Led accessibility overhaul increasing compliance by 35%' },
      { year: '2023', detail: 'Hosted 12 cross-team co-creation sessions' },
    ],
    [],
  );

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
        {highlights.map((item) => (
          <View key={item.label} style={styles.highlightRow}>
            <Text style={[styles.highlightLabel, { color: theme.secondaryText }]}>{item.label}</Text>
            <Text style={[styles.highlightValue, { color: theme.text }]}>{item.value}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Focus areas</Text>
        <View style={styles.tagGrid}>
          {skillTags.map((tag) => (
            <View
              key={tag}
              style={[styles.tag, { backgroundColor: theme.pillBackground, borderColor: theme.border }]}
            >
              <Text style={[styles.tagLabel, { color: theme.secondaryText }]}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Milestones</Text>
        <View style={[styles.timeline, { borderColor: theme.border }]}>
          {milestones.map((milestone, index) => (
            <View key={milestone.detail} style={styles.timelineRow}>
              <View style={styles.timelineMarkerContainer}>
                <View style={[styles.timelineMarker, { backgroundColor: theme.primary }]} />
                {index < milestones.length - 1 ? (
                  <View style={[styles.timelineConnector, { borderColor: theme.border }]} />
                ) : null}
              </View>
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineYear, { color: theme.secondaryText }]}>{milestone.year}</Text>
                <Text style={[styles.timelineDetail, { color: theme.text }]}>{milestone.detail}</Text>
              </View>
            </View>
          ))}
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
  highlightRow: {
    gap: 6,
  },
  highlightLabel: {
    fontSize: 13,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  highlightValue: {
    fontSize: 16,
    lineHeight: 22,
  },
  tagGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    borderRadius: 999,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  tagLabel: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  timeline: {
    gap: 18,
    borderLeftWidth: 1,
    paddingLeft: 18,
    marginLeft: 6,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timelineMarkerContainer: {
    alignItems: 'center',
  },
  timelineMarker: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  timelineConnector: {
    flex: 1,
    width: 0,
    borderLeftWidth: 1,
    marginTop: 6,
  },
  timelineContent: {
    flex: 1,
    gap: 4,
  },
  timelineYear: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  timelineDetail: {
    fontSize: 15,
    lineHeight: 22,
  },
});
