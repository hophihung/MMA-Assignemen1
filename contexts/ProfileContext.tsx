import React, { createContext, useContext, useMemo, useState } from 'react';

type Profile = {
  name: string;
  bio: string;
  avatar: string;
};

type ProfileContextValue = {
  profile: Profile;
  updateProfile: (updates: Partial<Profile>) => void;
};

const defaultProfile: Profile = {
  name: 'Jordan Smith',
  bio: 'Product designer who loves turning complex ideas into intuitive experiences.',
  avatar: 'https://i.pravatar.cc/240?img=12',
};

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);

  const updateProfile = (updates: Partial<Profile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const value = useMemo(
    () => ({
      profile,
      updateProfile,
    }),
    [profile],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }

  return context;
};
