import { Theme, useTheme } from "@/src/app/providers/ThemeProvider";
import { Moon, Sun } from "lucide-react-native";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { SettingsContainer } from "./SettingsContainer";

export function ThemeSwitcher() {
  const { theme, themeType, toggleTheme } = useTheme();
  const { t } = useTranslation()

  const styles = useMemo(() => getStyles(theme), [theme])

  return (
    <SettingsContainer title={t('settings.theme')}>
      <View style={styles.options}>
        <>
          {themeType == 'dark'
            ?
              <View style={styles.selected}>
                  <Moon color={theme.colors.text} size={24} />
                  <Text style={styles.optionText}>
                    {t('settings.dark')}
                  </Text>
              </View>
            :
              <Pressable style={styles.option} onPress={toggleTheme}>
                <Moon color={theme.colors.text} size={24} />
                <Text style={styles.optionText}>
                  {t('settings.dark')}
                </Text>
              </Pressable>
          }
        </>
        <>
          {themeType == 'light'
            ?
              <View style={styles.selected}>
                <Sun color={theme.colors.text} size={24} />
                <Text style={styles.optionText}>
                  {t('settings.light')}
                </Text>
              </View>
            : 
              <Pressable style={styles.option} onPress={toggleTheme}>
                <Sun color={theme.colors.text} size={24} />
                <Text style={styles.optionText}>
                  {t('settings.light')}
                </Text>
              </Pressable>
          }
        </>
      </View>
    </SettingsContainer>
  )
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: 14,
      borderRadius: theme.borderRadius.large,
      backgroundColor: theme.colors.cardBackground,
    },
    options: {
      flexDirection: "row",
    },
    option: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      padding: 20,
      gap: 10,
    },
    selected: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      padding: 20,
      gap: 10,
      borderRadius: theme.borderRadius.large,
      backgroundColor: theme.colors.primary,
    },
    optionText: {
      color: theme.colors.text,
    },
    title: {
      alignSelf: 'flex-start',
      marginBottom: theme.spacing.m,
      fontFamily: theme.typography.title.fontFamily,
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.text,
      marginLeft: 5,
    },
  });
