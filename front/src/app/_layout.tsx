import { DarkTheme, ThemeProvider, Stack } from 'expo-router';
import { colors } from '@/components/cinema-ui';

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </ThemeProvider>
  );
}
