import { Stack } from 'expo-router';
import { useTheme } from '@/src/app/providers/ThemeProvider';
import { useTranslation } from 'react-i18next';

export default function StatsLayout() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: theme.colors.text,        
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          color: theme.colors.text,
          fontFamily: theme.typography.title.fontFamily,
          fontSize: theme.typography.title.fontSize,
        },
      }}
    >
      <Stack.Screen name="index" options={{title: t('tabs.stats')}} />
    </Stack>
  );
}