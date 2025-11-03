import { Theme, useTheme } from "@/src/app/providers/ThemeProvider";
import { useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";

interface SettingsContainerProps {
  title: string;
  children?: React.ReactNode;
}

export const SettingsContainer: React.FC<SettingsContainerProps> = ({ title, children }) => {
  const { theme } = useTheme();

  const styles = useMemo(() => getStyles(theme), [theme])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>
      {children}
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
    title: {
      alignSelf: 'flex-start',
      marginBottom: theme.spacing.m,
      fontFamily: theme.typography.title.fontFamily,
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.text,
      marginLeft: 5,
    },
  });
