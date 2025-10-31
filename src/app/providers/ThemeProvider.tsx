import { createContext, useContext, useEffect, useState } from "react";
import { darkTheme, lightTheme, Theme, ThemeType } from "@src/lib/theme";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    const [themeType, setThemeType] = useState<ThemeType>(systemColorScheme || 'light');
    const [loading, setLoading] = useState(true);

   useEffect(() => {
        const loadSavedTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (savedTheme === 'light' || savedTheme === 'dark') {
                    setThemeType(savedTheme as ThemeType);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        loadSavedTheme();
    }, []);

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

export { Theme };

export default ThemeProvider;