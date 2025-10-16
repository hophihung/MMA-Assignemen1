import { useMemo } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

type ProfileCardProps = {
  name: string;
  bio: string;
  avatar: string;
  onEdit: () => void;
  onSettings: () => void;
};

export const ProfileCard = ({ name, bio, avatar, onEdit, onSettings }: ProfileCardProps) => {
  const { theme } = useTheme();

  const stats = useMemo(
    () => [
      { label: 'Projects', value: '24' },
      { label: 'Experience', value: '8 yrs' },
      { label: 'Satisfaction', value: '98%' },
    ],
    [],
  );

  const focusAreas = useMemo(
    () => ['Product Strategy', 'Design Systems', 'Facilitation'],
    [],
  );

  const cardSurfaceStyle = useMemo(() => {
    const platformShadow = Platform.select({
      ios: {
        shadowOpacity: 0.14,
        shadowRadius: 24,
        shadowOffset: { width: 0, height: 12 },
      },
      android: {
        elevation: 8,
      },
      default: {},
    });

    return {
      backgroundColor: theme.card,
      borderColor: theme.border,
      shadowColor: theme.shadow,
      ...platformShadow,
    };
  }, [theme]);

  return (
    <View style={[styles.container, cardSurfaceStyle]}>
      <View style={[styles.badge, { backgroundColor: theme.pillBackground, borderColor: theme.border }]}>
        <Text style={[styles.badgeLabel, { color: theme.primary }]}>Available for collaboration</Text>
      </View>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
      <Text style={[styles.bio, { color: theme.secondaryText }]}>{bio}</Text>
      <View style={styles.tagRow}>
        {focusAreas.map((area) => (
          <View
            key={area}
            style={[styles.tagPill, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={[styles.tagText, { color: theme.secondaryText }]}>{area}</Text>
          </View>
        ))}
      </View>
      <View style={[styles.statsRow, { borderColor: theme.border }]}>
        {stats.map(({ label, value }) => (
          <View key={label} style={styles.stat}>
            <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
            <Text style={[styles.statLabel, { color: theme.secondaryText }]}>{label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.actions}>
        <Pressable
          onPress={onEdit}
          style={[styles.primaryButton, { backgroundColor: theme.primary }]}
          android_ripple={{ color: theme.accent }}>
          <Text style={styles.primaryButtonText}>Edit Profile</Text>
        </Pressable>
        <Pressable
          onPress={onSettings}
          style={[styles.secondaryButton, { borderColor: theme.border }]}
          android_ripple={{ color: theme.border }}>
          <Text style={[styles.secondaryButtonText, { color: theme.primary }]}>Settings</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    gap: 12,
    overflow: 'hidden',
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
  },
  badgeLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 4,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  tagPill: {
    borderRadius: 999,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 18,
    gap: 12,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  actions: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
});
