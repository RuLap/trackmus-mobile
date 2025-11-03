import { useTheme } from "@/src/app/providers/ThemeProvider";
import { Stack } from "expo-router";

export default function WelcomeLayout() {
  const { theme } = useTheme();
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleAlign: 'center',
        headerTintColor: theme.colors.text,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen
        options={{
          title: '',
          headerBackButtonDisplayMode: "default",
        }}
        name="index"
      />
    </Stack>
  );
}
