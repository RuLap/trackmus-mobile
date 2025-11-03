import { View, Text } from 'react-native'
import { Theme, useTheme } from '@/src/app/providers/ThemeProvider'
import { useTranslation } from 'react-i18next'
import { useMemo, useEffect, useState } from 'react'
import { router } from 'expo-router'
import { Button } from '@/src/components/ui'
import { StyleSheet } from 'react-native'
import { useAuthStore } from '@/src/features/auth/store'
import { authApi } from '@/src/features/auth/services/authApi'
import { useToast } from '@/src/hooks/useToast'

export default function ConfirmEmailPage() {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const { showSuccess, showError, handleApiError } = useToast()
  const { accessToken, email } = useAuthStore()
  const [countdown, setCountdown] = useState(0)

  const styles = useMemo(() => getStyles(theme), [theme])

  useEffect(() => {
    const sendInitialEmail = async () => {
      if (accessToken && email) {
        try {
          await authApi.sendConfirmation({ 
            email: email,
          }, accessToken)
          startCountdown()
        } catch (error) {
          handleApiError(error)
        }
      }
    }

    sendInitialEmail()
  }, [accessToken, email])

  const startCountdown = () => {
    setCountdown(120)
  }

  useEffect(() => {
    if (countdown <= 0) return
    const interval = setInterval(() => {
      setCountdown(prev => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [countdown])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const handleCheckEmailConfirmed = async () => {
    if (!accessToken) {
      showError(t('common.error'))
      return
    }
    
    try {
      const checkResponse = await authApi.confirmed(accessToken)
      
      if (checkResponse.confirmed) {
        router.replace('/(app)/(tabs)/(tasks)')
      } else {
        showError(t('auth.emailNotConfirmed'))
      }
    } catch (error) {
      console.error('Check email confirmed error:', error)
      handleApiError(error)
    }
  }

  const handleResendConfirmation = async () => {
    if (!accessToken || !email) {
      showError(t('common.error'))
      return
    }
    
    try {
      await authApi.sendConfirmation({ 
        email: email,
      }, accessToken)
      startCountdown()
      showSuccess(t('auth.emailSent'))
    } catch (error) {
      console.error('Resend confirmation error:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('auth.confirmEmailTitle')}</Text>
      
      <Text style={styles.message}>
        {t('auth.confirmEmailMessage')}
      </Text>

      {email && (
        <Text style={styles.emailText}>
          {email}
        </Text>
      )}

      <View style={styles.buttonsContainer}>
        <Button
          title={t('auth.emailConfirmed')}
          onPress={handleCheckEmailConfirmed}
          style={styles.confirmButton}
        />

        <Button
          title={
            countdown > 0
              ? `${t('auth.resendConfirmation')} (${t('auth.in')} ${formatTime(countdown)})`
              : t('auth.resendConfirmation')
          }
          variant="ghost"
          onPress={handleResendConfirmation}
          style={styles.resendButton}
          disabled={countdown > 0}
        />
      </View>
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
    message: {
      fontFamily: theme.typography.body.fontFamily,
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.text,
      marginBottom: theme.spacing.l,
      textAlign: 'center',
      lineHeight: 20,
    },
    emailText: {
      fontFamily: theme.typography.body.fontFamily,
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.primary,
      marginBottom: theme.spacing.xl,
      textAlign: 'center',
    },
    buttonsContainer: {
      width: '100%',
    },
    confirmButton: {
      marginBottom: theme.spacing.m,
    },
    resendButton: {
      marginTop: theme.spacing.m,
    },
    successText: {
      fontFamily: theme.typography.body.fontFamily,
      fontSize: theme.typography.caption.fontSize,
      color: theme.colors.success,
      textAlign: 'center',
      marginBottom: theme.spacing.m,
    },
    errorText: {
      fontFamily: theme.typography.body.fontFamily,
      fontSize: theme.typography.caption.fontSize,
      color: theme.colors.error,
      textAlign: 'center',
      marginBottom: theme.spacing.m,
    },
  })