import { PropsWithChildren, ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export const colors = {
  background: '#0e0e0e',
  surface: '#1b1b1b',
  surfaceHigh: '#2a2a2a',
  text: '#e2e2e2',
  muted: '#b6aeb0',
  pink: '#ffb1c3',
  pinkDark: '#ff4b89',
  cyan: '#00dbe9',
  border: 'rgba(255,177,195,0.2)',
  danger: '#ff7485',
};

const navigation = [
  { label: 'الرئيسية', route: '/' as const },
  { label: 'الأفلام', route: '/movies' as const },
  { label: 'الممثلون', route: '/actors' as const },
  { label: 'الطاقم', route: '/cast' as const },
  { label: 'الإدارة', route: '/dashboard' as const },
];

export function AppScreen({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Pressable onPress={() => router.push('/')} accessibilityRole="button">
          <Text style={styles.brand}><Text style={styles.brandMark}>◈ </Text>CineScope</Text>
        </Pressable>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.nav}
        >
          {navigation.map((item) => (
            <Pressable
              key={item.route}
              onPress={() => router.push(item.route)}
              style={({ pressed }) => [styles.navItem, pressed && styles.pressed]}
              accessibilityRole="link"
            >
              <Text style={styles.navText}>{item.label}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      {children}
    </SafeAreaView>
  );
}

export function Page({ children }: PropsWithChildren) {
  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.pageContent}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}

export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <View style={styles.heading}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.muted}>{description}</Text> : null}
    </View>
  );
}

export function SearchField({
  value,
  onChangeText,
  placeholder,
}: {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.muted}
      style={styles.search}
      textAlign="right"
      returnKeyType="search"
      accessibilityLabel={placeholder}
    />
  );
}

export function Field({
  label,
  ...props
}: TextInputProps & { label: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        {...props}
        placeholderTextColor={colors.muted}
        style={styles.input}
        textAlign="right"
      />
    </View>
  );
}

export function ActionButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  icon,
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  icon?: ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        variant === 'primary' ? styles.primaryButton : null,
        variant === 'secondary' ? styles.secondaryButton : null,
        variant === 'danger' ? styles.dangerButton : null,
        (pressed || disabled) && styles.pressed,
      ]}
      accessibilityRole="button"
    >
      {disabled ? <ActivityIndicator color={colors.background} /> : icon}
      <Text
        style={[
          styles.buttonText,
          variant === 'primary' ? styles.primaryButtonText : null,
          variant === 'danger' ? styles.dangerButtonText : null,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function Surface({ children, style }: PropsWithChildren<{ style?: object }>) {
  return <View style={[styles.surface, style]}>{children}</View>;
}

export function Notice({
  children,
  tone = 'info',
}: PropsWithChildren<{ tone?: 'info' | 'error' | 'success' }>) {
  return (
    <Text
      accessibilityRole="alert"
      style={[
        styles.notice,
        tone === 'error' ? styles.errorNotice : null,
        tone === 'success' ? styles.successNotice : null,
      ]}
    >
      {children}
    </Text>
  );
}

export function EmptyState({ children }: PropsWithChildren) {
  return <Text style={styles.empty}>{children}</Text>;
}

export function SectionTitle({
  title,
  count,
}: {
  title: string;
  count?: number;
}) {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.sectionHeading}>{title}</Text>
      {count !== undefined ? <Text style={styles.count}>{count} نتيجة</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingTop: 10,
    paddingBottom: 8,
    paddingHorizontal: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    gap: 12,
  },
  brand: { color: colors.text, fontSize: 20, fontWeight: '800', textAlign: 'right' },
  brandMark: { color: colors.pink },
  nav: { gap: 8, flexDirection: 'row-reverse', paddingVertical: 3 },
  navItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: colors.surface,
  },
  navText: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  pressed: { opacity: 0.65 },
  page: { flex: 1 },
  pageContent: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 40,
    gap: 18,
  },
  heading: { gap: 7, marginBottom: 4 },
  eyebrow: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'right',
  },
  title: { color: colors.text, fontSize: 34, fontWeight: '800', textAlign: 'right' },
  muted: { color: colors.muted, textAlign: 'right', lineHeight: 22 },
  search: {
    minHeight: 50,
    borderRadius: 25,
    backgroundColor: colors.surfaceHigh,
    color: colors.text,
    paddingHorizontal: 18,
    fontSize: 14,
  },
  field: { gap: 7 },
  fieldLabel: { color: colors.muted, textAlign: 'right', fontSize: 13 },
  input: {
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceHigh,
    color: colors.text,
    paddingHorizontal: 13,
    fontSize: 15,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 16,
    borderRadius: 24,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  primaryButton: { backgroundColor: colors.pink },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dangerButton: { backgroundColor: 'rgba(255,116,133,0.14)' },
  buttonText: { color: colors.text, fontWeight: '700', fontSize: 13 },
  primaryButtonText: { color: '#38111f' },
  dangerButtonText: { color: colors.danger },
  surface: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: colors.surface,
    padding: 16,
    gap: 12,
  },
  notice: {
    borderRadius: 12,
    backgroundColor: colors.surfaceHigh,
    color: colors.text,
    padding: 12,
    textAlign: 'right',
    overflow: 'hidden',
  },
  errorNotice: { color: colors.danger },
  successNotice: { color: colors.cyan },
  empty: { color: colors.muted, padding: 20, textAlign: 'center' },
  sectionTitle: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  sectionHeading: { color: colors.text, fontSize: 20, fontWeight: '700', textAlign: 'right' },
  count: { color: colors.pink, fontSize: 12 },
});
