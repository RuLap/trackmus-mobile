import { View, Text } from 'react-native'
import { useTheme } from '@/src/app/providers/ThemeProvider'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { router } from 'expo-router'
import { Button } from '@/src/components/ui'
import { RegisterForm } from '@/src/features/auth/components/RegisterForm'
import { StyleSheet } from 'react-native'

export default function RegisterPage() {
  const { theme } = useTheme()
  const { t } = useTranslation()

  const styles = useMemo(() => getStyles(theme), [theme])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('auth.registerTitle')}</Text>
      <RegisterForm />

      <Button
        variant="ghost"
        title={t('auth.login')}
        onPress={() => router.replace('/(auth)/login')}
        style={styles.switchButton}
      />
    </View>
  )
}

const getStyles = (theme: any) =>
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