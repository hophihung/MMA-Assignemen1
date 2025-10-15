import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

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

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
      <Text style={[styles.bio, { color: theme.secondaryText }]}>{bio}</Text>
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
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 6,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
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
