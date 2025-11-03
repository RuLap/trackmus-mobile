import { useState } from 'react'
import { View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../store'
import { Input } from '@/src/components/ui/Input'
import { Button } from '@/src/components/ui'
import { router } from 'expo-router'

export function LoginForm() {
  const { login, setAuthFromResponse, isLoading, error } = useAuthStore()
  const { t } = useTranslation()
  const [email, setEmail] = useState('meshkov-74@yandex.ru')
  const [password, setPassword] = useState('Qwerty123')

  const handleSubmit = async () => {
    try {
      const res = await login({ email, password })

      await setAuthFromResponse(res)

      router.replace('/(app)/(tabs)/(tasks)')
    } catch (err) {
      console.log('Login error', err)
    }
  }

  return (
    <View style={{ width: '100%' }}>
      <Input
        placeholder={t('auth.email')}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Input
        placeholder={t('auth.password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      <Button
        title={isLoading ? t('auth.loading') : t('auth.login')}
        onPress={handleSubmit}
        disabled={isLoading}
        style={{ marginTop: 16 }}
      />
    </View>
  )
}
