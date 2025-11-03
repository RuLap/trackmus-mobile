import { Theme, useTheme } from "@/src/app/providers/ThemeProvider";
import i18n, { changeLanguage } from "@/src/lib/i18n";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Text, Pressable } from "react-native";

export function LanguageSwitcher() {
  const { theme } = useTheme();
  const { t } = useTranslation()

  const [lang, setLang] = useState<'ru' | 'en'>(i18n.language as 'ru' | 'en');

  const styles = useMemo(() => getStyles(theme), [theme])

  const toggleLang = async () => {
    const newLang: 'ru' | 'en' = lang === 'ru' ? 'en' : 'ru';
    setLang(newLang);
    await changeLanguage(newLang);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t('settings.language')}
      </Text>
      <View style={styles.options}>
        <>
          {lang == 'ru'
            ?
              <View style={styles.selected}>
                  <Text style={styles.optionText}>
                    Русский
                  </Text>
              </View>
            :
              <Pressable style={styles.option} onPress={toggleLang}>
                <Text style={styles.optionText}>
                  Русский
                </Text>
              </Pressable>
          }
        </>
        <>
          {lang == 'en'
            ?
              <View style={styles.selected}>
                <Text style={styles.optionText}>
                  English
                </Text>
              </View>
            : 
              <Pressable style={styles.option} onPress={toggleLang}>
                <Text style={styles.optionText}>
                  English
                </Text>
              </Pressable>
          }
        </>
      </View>
    </View>
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
