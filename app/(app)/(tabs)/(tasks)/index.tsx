import { Theme, useTheme } from "@/src/app/providers/ThemeProvider";
import { useAuthStore } from "@/src/features/auth";
import { Tabs, TaskList, tasksApi } from "@/src/features/tasks";
import { GetTaskShortResponse } from "@/src/features/tasks/types/task";
import { useToast } from "@/src/hooks/useToast";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

export default function TasksPage() {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const { accessToken } = useAuthStore()
  const { handleApiError } = useToast()
  const [tab, setTab] = useState<'active' | 'done'>('active');
  const [tasks, setTasks] = useState<GetTaskShortResponse[]>([])
  
  const styles = useMemo(() => getStyles(theme), [theme])

  const getTasks = async (isCompleted: boolean) => {
    try {
      if (isCompleted) {
        const res = await tasksApi.completed(accessToken as string)
        setTasks(res)
      } else {
        const res = await tasksApi.active(accessToken as string)
        setTasks(res)
      }
    } catch (error) {
      handleApiError(error)
    }
  }

  useEffect(() => {
    getTasks(tab === 'done');
  }, [tab]);

  return (
    <View style={styles.container}>
      <Tabs tab={tab} setTab={setTab} />
      <TaskList tasks={tasks} />
    </View>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '90%',
      flexDirection: 'column',
      alignSelf: 'center',
      justifyContent: 'flex-start',
      marginTop: 10,
      gap: 20,
    },
    logoutBtn: {
      width: '100%',
      marginTop: 30,
      backgroundColor: theme.colors.error,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: 8,
    },
  });