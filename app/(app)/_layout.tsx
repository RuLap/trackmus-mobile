import { useTheme } from "@/src/app/providers/ThemeProvider";
import { Stack } from "expo-router";

export default function AppLayout() {
  const { theme } = useTheme();
  
  return (
    <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
      <Stack.Screen name='(tabs)' />
    </Stack>
  );
}
