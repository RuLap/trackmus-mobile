import { StyleSheet, View, Text } from "react-native";
import { useMemo } from "react";
import { Theme } from "@/src/lib/theme";
import { useTheme } from "@/src/app/providers/ThemeProvider";
import { GetTaskShortResponse } from "../types/task";

interface TaskShortProps {
  task: GetTaskShortResponse
}

export function TaskShort({ task }: TaskShortProps) {
  const { theme } = useTheme()

  const styles = useMemo(() => getStyles(theme), [theme])

  const progressPercent = Math.min(Math.max(task.progress, 0), 100);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'column', width: '100%'}}>
        <Text style={styles.title}>
          {task.title}
        </Text>
        <Text style={styles.bpm}>
          {`${task.targetBpm} bpm`}
        </Text>
      </View>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
      </View>
    </View>
  )
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: 14,
      gap: 10,
      borderRadius: theme.borderRadius.large,
      backgroundColor: theme.colors.cardBackground,
    },
    title: {
      alignSelf: 'flex-start',
      fontFamily: theme.typography.title.fontFamily,
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.text,
    },
    bpm: {
      alignSelf: 'flex-start',
      fontFamily: theme.typography.body.fontFamily,
      fontSize: theme.typography.caption.fontSize,
      color: theme.colors.textSecondary,
    },
    progressBarBackground: {
      width: '100%',
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.colors.secondary,
      marginBottom: 5,
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: theme.colors.primary,
      borderRadius: 3,
    },
  });