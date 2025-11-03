import { View, Text } from 'react-native'
import { Theme, useTheme } from '@/src/app/providers/ThemeProvider'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { router } from 'expo-router'
import { Button } from '@/src/components/ui'
import { LoginForm } from '@/src/features/auth/components/LoginForm'
import { StyleSheet } from 'react-native'

export default function LoginPage() {
  const { theme } = useTheme()
  const { t } = useTranslation()

  const styles = useMemo(() => getStyles(theme), [theme])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('auth.loginTitle')}</Text>
      <LoginForm />

      <Button
        variant="ghost"
        title={t('auth.register')}
        onPress={() => router.replace('/(auth)/register')}
        style={styles.switchButton}
      />
    </View>
  )
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.l,
      justifyContent: 'center',
    },
    title: {
      fontFamily: theme.typography.header.fontFamily,
      fontSize: theme.typography.header.fontSize,
      color: theme.colors.text,
      marginBottom: theme.spacing.xxl,
      textAlign: 'center',
    },
    switchButton: {
      marginTop: theme.spacing.xl,
    },
  })
