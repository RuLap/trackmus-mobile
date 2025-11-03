import { useState } from 'react'
import { View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../store'
import { Input } from '@/src/components/ui/Input'
import { Button } from '@/src/components/ui'
import { router } from 'expo-router'

export function RegisterForm() {
  const { register, setAuthFromResponse, isLoading, error } = useAuthStore()
  const { t } = useTranslation()
  const [email, setEmail] = useState('meshkov-74@yandex.ru')
  const [password, setPassword] = useState('Qwerty123')
  const [confirmPassword, setConfirmPassword] = useState('Qwerty123')
  const [formError, setFormError] = useState('')

  const handleSubmit = async () => {
  setFormError('')

  if (!email || !password || !confirmPassword) {
    setFormError(t('auth.errors.allFieldsRequired'))
    return
  }

  if (password !== confirmPassword) {
    setFormError(t('auth.errors.passwordsDontMatch'))
    return
  }

  if (password.length < 6) {
    setFormError(t('auth.errors.passwordTooShort'))
    return
  }

  try {
    const response = await register({ email, password })
    
    await setAuthFromResponse(response);
      
    router.replace('/(auth)/confirm-email')
  } catch (err: any) {
    console.log('Register error', err)
  }
}

  return (
    <View style={{ width: '100%' }}>
      <Input
        placeholder={t('auth.email')}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <Input
        placeholder={t('auth.password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="password"
      />
      <Input
        placeholder={t('auth.confirmPassword')}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoComplete="password"
      />

      {(error || formError) && (
        <Text style={{ color: 'red', marginBottom: 16, textAlign: 'center' }}>
          {error || formError}
        </Text>
      )}

      <Button
        title={isLoading ? t('auth.loading') : t('auth.register')}
        onPress={handleSubmit}
        disabled={isLoading}
        style={{ marginTop: 16 }}
      />
    </View>
  )
}