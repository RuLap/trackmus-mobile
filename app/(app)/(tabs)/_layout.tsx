import { useTheme } from "@/src/app/providers/ThemeProvider";
import { Tabs, usePathname } from "expo-router";
import { useTranslation } from "react-i18next";
import { ChartColumn, CircleUser, ListMusic } from "lucide-react-native";

export default function TabsLayout() {
  const { theme } = useTheme();
  const { t } = useTranslation()
  const pathname = usePathname()

  const showTabBar = pathname === '/';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: theme.colors.background },
        tabBarStyle: !showTabBar ? { display: 'none' } : {
          backgroundColor: theme.colors.background,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="(stats)"
        options={{
          title: t('tabs.stats'),
          tabBarIcon: ({ focused, size }) => (
            <ChartColumn
              size={focused ? size * 1.3 : size * 0.9} 
              color={focused ? theme.colors.primary : theme.colors.secondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(tasks)"
        options={{
          title: t('tabs.tasks'),
          tabBarIcon: ({ focused, size }) => (
            <ListMusic
              size={focused ? size * 1.3 : size * 0.9} 
              color={focused ? theme.colors.primary : theme.colors.secondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({ focused, size }) => (
            <CircleUser
              size={focused ? size * 1.3 : size * 0.9} 
              color={focused ? theme.colors.primary : theme.colors.secondary}
            />
          ),
        }}
      />
    </Tabs>
  );
}
