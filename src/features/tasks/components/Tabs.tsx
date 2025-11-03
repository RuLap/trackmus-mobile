import { StyleSheet, View, Text, Pressable } from "react-native";
import { useMemo } from "react";
import { Theme } from "@/src/lib/theme";
import { useTheme } from "@/src/app/providers/ThemeProvider";
import { useTranslation } from "react-i18next";

interface TabsProps {
  tab: 'active' | 'done';
  setTab: (tab: 'active' | 'done') => void;
}

export function Tabs({ tab, setTab }: TabsProps) {
  const { theme } = useTheme()
  const { t } = useTranslation()

  const styles = useMemo(() => getStyles(theme), [theme])

  const toggleTab = () => {
    if (tab == 'active') {
      setTab('done')
    } else {
      setTab('active')
    }
  }

  return (
    <View style={styles.container}>
      {
        tab == 'active'
          ?
            <View style={styles.selected}>
              <Text style={styles.title}>
                {t('tasks.active')}
              </Text>
            </View>
          :
            <Pressable style={styles.option} onPress={toggleTab}>
              <Text style={styles.title}>
                {t('tasks.active')}
              </Text>
            </Pressable>
      }
      {
        tab == 'done'
          ?
            <View style={styles.selected}>
              <Text style={styles.title}>
                {t('tasks.done')}
              </Text>
            </View>
          :
            <Pressable style={styles.option} onPress={toggleTab}>
              <Text style={styles.title}>
                {t('tasks.done')}
              </Text>
            </Pressable>
      }
    </View>
  )
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: 10,
      borderRadius: theme.borderRadius.large,
      backgroundColor: theme.colors.cardBackground,
    },
    option: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      padding: 3,
      backgroundColor: theme.colors.cardBackground,
    },
    selected: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      padding: 3,
      borderRadius: theme.borderRadius.medium,
      backgroundColor: theme.colors.primary,
    },
    title: {
      fontFamily: theme.typography.title.fontFamily,
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.text,
    },
  });