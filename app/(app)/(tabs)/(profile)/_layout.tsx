import { router, Stack } from 'expo-router';
import { useTheme } from '@/src/app/providers/ThemeProvider';
import { Pressable, View } from 'react-native';
import { Settings } from 'lucide-react-native';
import { useTranslation } from 'react-i18next'

export default function ProfileLayout() {
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
      <Stack.Screen 
        name='index'
        options={{
          title: t('tabs.profile'),
          headerRight: () => (
            <View style={{ alignItems: 'center', marginBottom: 3 }}>
              <Pressable 
                onPress={() => router.push('/settings')}
              >
                <Settings color={theme.colors.text} size={22} />
              </Pressable>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name='settings'
        options={{
          title: t('pages.settings'),
          headerBackButtonDisplayMode: 'default',
          presentation: 'pageSheet',
        }}
      />
    </Stack>
  );
}