import { Theme, useTheme } from "@/src/app/providers/ThemeProvider";
import { ChevronRight, LucideIcon } from "lucide-react-native";
import { useMemo } from "react";
import { Text, StyleSheet, Pressable, View } from "react-native";

interface SettingsListItemProps {
  title: string;
  icon: LucideIcon;
  onPress?: () => void;
}

export function SettingsListItem({ title, icon: Icon, onPress }: SettingsListItemProps) {
  const { theme } = useTheme();

  const styles = useMemo(() => getStyles(theme), [theme])

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.icon}>
        <Icon size={26} color={theme.colors.text} />
      </View>
      <Text style={styles.title}>
        {title}
      </Text>
      <ChevronRight size={20} color={theme.colors.text} style={styles.right} />
    </Pressable>
  )
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      overflow: 'hidden',
      alignItems: 'center',
      borderRadius: theme.borderRadius.large,
      backgroundColor: theme.colors.cardBackground,
    },
    icon: {
      flex: 1,
      flexDirection: 'row',
      alignSelf: 'center',
      padding: 5,
      alignContent: 'center',
      borderRadius: theme.borderRadius.medium,
    },
    title: {
      flex: 6,
      alignSelf: 'center',
      fontFamily: theme.typography.body.fontFamily,
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.text,
    },
    right: {
      flex: 1,
    },
  });
