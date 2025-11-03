import { StyleSheet, View, Text } from "react-native";
import { GetTaskShortResponse } from "../types/task";
import { useMemo } from "react";
import { Theme } from "@/src/lib/theme";
import { useTheme } from "@/src/app/providers/ThemeProvider";
import { TaskShort } from "./TaskShort";
import { useTranslation } from "react-i18next";

interface TaskListProps {
  tasks: GetTaskShortResponse[]
}

export function TaskList({ tasks }: TaskListProps) {
  const { theme } = useTheme()
  const { t } = useTranslation()

  const styles = useMemo(() => getStyles(theme), [theme])
  
  if (tasks.length == 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>
          {t('tasks.empty')}
        </Text>
      </View>
    )
  }

  return (
    <View>
      {tasks.map((task, i) => (
        <TaskShort key={task.id} task={task} />
      ))}
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
    empty: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      marginBottom: theme.spacing.m,
      fontFamily: theme.typography.title.fontFamily,
      fontSize: theme.typography.body.fontSize,
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