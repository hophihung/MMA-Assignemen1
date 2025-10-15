import { useRouter } from 'expo-router';
import type { FormikProps } from 'formik';
import { Formik } from 'formik';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';

import { useProfile } from '@/contexts/ProfileContext';
import { useTheme } from '@/contexts/ThemeContext';

type FormValues = {
  name: string;
  bio: string;
};

const validationSchema = Yup.object({
  name: Yup.string().trim().min(2, 'Name must be at least 2 characters').required('Name is required'),
  bio: Yup.string().trim().min(10, 'Bio must be at least 10 characters').required('Bio is required'),
}) satisfies Yup.ObjectSchema<FormValues>;

export default function EditProfileScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useProfile();
  const { theme } = useTheme();

  const initialValues: FormValues = {
    name: profile.name,
    bio: profile.bio,
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values) => {
        updateProfile({ name: values.name.trim(), bio: values.bio.trim() });
        router.back();
      }}
    >
      {(formik: FormikProps<FormValues>) => {
        const {
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
          isValid,
          dirty,
        } = formik;

        return (
        <ScrollView
          contentContainerStyle={styles.content}
          style={[styles.screen, { backgroundColor: theme.background }]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Name</Text>
            <TextInput
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              placeholder="Your name"
              style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
              placeholderTextColor={theme.secondaryText}
            />
            {touched.name && errors.name ? (
              <Text style={[styles.errorText, { color: theme.accent }]}>{errors.name}</Text>
            ) : null}
          </View>
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Bio</Text>
            <TextInput
              value={values.bio}
              onChangeText={handleChange('bio')}
              onBlur={handleBlur('bio')}
              placeholder="Tell us about yourself"
              style={[styles.input, styles.multilineInput, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
              placeholderTextColor={theme.secondaryText}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            {touched.bio && errors.bio ? (
              <Text style={[styles.errorText, { color: theme.accent }]}>{errors.bio}</Text>
            ) : null}
          </View>
          <View style={styles.actions}>
            <Pressable
              onPress={() => router.back()}
              style={[styles.secondaryButton, { borderColor: theme.border }]}
              android_ripple={{ color: theme.border }}>
              <Text style={[styles.secondaryLabel, { color: theme.secondaryText }]}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => handleSubmit()}
              style={[styles.primaryButton, { backgroundColor: theme.primary, opacity: !isValid || !dirty ? 0.5 : 1 }]}
              disabled={!isValid || !dirty || isSubmitting}
              android_ripple={{ color: theme.accent }}>
              <Text style={styles.primaryLabel}>Save changes</Text>
            </Pressable>
          </View>
        </ScrollView>
        );
      }}
    </Formik>
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
  fieldGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 16,
  },
  multilineInput: {
    minHeight: 120,
  },
  errorText: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  secondaryLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  primaryButton: {
    flex: 1,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  primaryLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
