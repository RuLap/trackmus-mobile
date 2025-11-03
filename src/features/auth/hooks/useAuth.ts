import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuthStore } from '../store'
import { authApi } from '../services/authApi'

export function useAuth() {
  const { refreshTokens, logout } = useAuthStore()
  const [initializing, setInitializing] = useState(true)
  const [authState, setAuthState] = useState<'checking' | 'not_authenticated' |
      'authenticated_no_email' | 'fully_authenticated'>('checking')

  useEffect(() => {
    const init = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('accessToken')

        if (!storedToken) {
          setAuthState('not_authenticated')
          setInitializing(false)
          return
        }

        try {
          await refreshTokens()

          const checkResponse = await authApi.confirmed(storedToken)

          if (checkResponse.confirmed) {
            setAuthState('fully_authenticated')
          } else {
            setAuthState('authenticated_no_email')
          }
        } catch (error) {
          await logout()
        }
      } catch (error) {
        setAuthState('not_authenticated')
      } finally {
        setInitializing(false)
      }
    }

    init()
  }, [])

  return { 
    isAuthenticated: authState === 'authenticated_no_email' || authState === 'fully_authenticated',
    isFullyAuthenticated: authState === 'fully_authenticated',
    needsEmailVerification: authState === 'authenticated_no_email',
    initializing,
    authState
  }
}