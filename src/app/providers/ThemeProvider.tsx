import { createContext, useContext, useEffect, useState } from "react";
import { darkTheme, lightTheme, Theme, ThemeType } from "@src/lib/theme";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/src/features/auth";
import { useFonts } from "expo-font";

interface ThemeContextType {
  theme: Theme;
  themeType: ThemeType;
  toggleTheme: () => void;
  setThemeType: (type: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'app_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>('light');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadSavedTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
          setThemeType(savedTheme as ThemeType);
      } else if (systemColorScheme) {
          setThemeType(systemColorScheme);
      }
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  };
    loadSavedTheme();
  }, []);

  useEffect(() => {
    if (!loading) {
        AsyncStorage.getItem(THEME_STORAGE_KEY).then(savedTheme => {
            if (!savedTheme && systemColorScheme) {
                setThemeType(systemColorScheme);
            }
        });
    }
  }, [systemColorScheme, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#6366F1' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const theme = themeType === 'light' ? lightTheme : darkTheme;

  const toggleTheme = () => {
    const newTheme = themeType === 'light' ? 'dark' : 'light';
    setThemeType(newTheme);
    AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  const updateTheme = (type: ThemeType) => {
    setThemeType(type);
    AsyncStorage.setItem(THEME_STORAGE_KEY, type)
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeType,
        toggleTheme,
        setThemeType: updateTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context;
}

export function ThemedLayout() {
  const { isAuthenticated, isFullyAuthenticated, initializing } = useAuth();
  const { theme } = useTheme();
  
  const [fontsLoaded] = useFonts({
    'Montserrat-Medium': require('../../../assets/fonts/Montserrat/Medium.ttf'),
    'Montserrat-Bold': require('../../../assets/fonts/Montserrat/Bold.ttf'),
    'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat/SemiBold.ttf'),

    'Open-Sans': require('../../../assets/fonts/Open-Sans/Regular.ttf'),
  });

  if (initializing || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Stack
        initialRouteName="(root)"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}>
        <Stack.Screen name="(root)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
      </Stack>
    </View>
  );
}

export { Theme };

export default ThemeProvider;