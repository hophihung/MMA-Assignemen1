import { useRouter } from 'expo-router';
import type { FormikProps } from 'formik';
import { Formik } from 'formik';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
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
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={[styles.safeArea, { backgroundColor: theme.background }]}
          >
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
              <View style={[styles.formCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <View style={styles.formHeader}>
                  <Text style={[styles.formTitle, { color: theme.text }]}>Profile details</Text>
                  <Text style={[styles.formSubtitle, { color: theme.secondaryText }]}>Share a concise, friendly story that helps people understand your strengths.</Text>
                </View>
                <View style={styles.fieldGroup}>
                  <Text style={[styles.label, { color: theme.text }]}>Name</Text>
                  <TextInput
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    placeholder="Your name"
                    style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
                    placeholderTextColor={theme.secondaryText}
                    selectionColor={theme.primary}
                  />
                  {touched.name && errors.name ? (
                    <Text style={[styles.errorText, { color: theme.accent }]}>{errors.name}</Text>
                  ) : (
                    <Text style={[styles.helperText, { color: theme.secondaryText }]}>Use your preferred name or the one collaborators recognize.</Text>
                  )}
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
                    selectionColor={theme.primary}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                  {touched.bio && errors.bio ? (
                    <Text style={[styles.errorText, { color: theme.accent }]}>{errors.bio}</Text>
                  ) : (
                    <Text style={[styles.helperText, { color: theme.secondaryText }]}>Share what drives you, the impact you bring, or a current focus area.</Text>
                  )}
                </View>
              </View>

              <View style={styles.actions}>
                <Pressable
                  onPress={() => router.back()}
                  style={[styles.secondaryButton, { borderColor: theme.border, backgroundColor: theme.surface }]}
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
          </KeyboardAvoidingView>
        );
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 24,
    gap: 24,
  },
  formCard: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 24,
    gap: 20,
  },
  formHeader: {
    gap: 6,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  formSubtitle: {
    fontSize: 15,
    lineHeight: 22,
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
  helperText: {
    fontSize: 13,
    lineHeight: 18,
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
