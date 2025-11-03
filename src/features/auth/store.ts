import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authApi } from './services/authApi'
import { LoginRequest, RegisterRequest, AuthResponse } from './types/auth'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  userId: string | null
  email: string | null
  isLoading: boolean
  error: string | null

  login: (body: LoginRequest) => Promise<AuthResponse>
  register: (body: RegisterRequest) => Promise<AuthResponse>
  refreshTokens: () => Promise<void>
  logout: () => Promise<void>
  setAuthFromResponse: (res: AuthResponse) => Promise<void>

  user: AuthResponse | null
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  refreshToken: null,
  userId: null,
  email: null,
  isLoading: false,
  error: null,

  get user() {
    const state = get()
    if (state.accessToken && state.userId && state.email) {
      return {
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        userId: state.userId,
        email: state.email,
      } as AuthResponse
    }
    return null
  },

  login: async (body) => {
    set({ isLoading: true, error: null })
    try {
      const res = await authApi.login(body)
      set({ isLoading: false })
      return res
    } catch (err: any) {
      set({ error: err.message || 'Login failed', isLoading: false })
      throw err
    }
  },

  register: async (body) => {
    set({ isLoading: true, error: null })
    try {
      const res = await authApi.register(body)
      set({ isLoading: false })
      return res
    } catch (err: any) {
      set({ error: err.message || 'Register failed', isLoading: false })
      throw err
    }
  },

  refreshTokens: async () => {
    const refreshToken = await AsyncStorage.getItem('refreshToken')
    if (!refreshToken) throw new Error('No refresh token')

    const res = await authApi.refresh({ refreshToken })
    await AsyncStorage.setItem('accessToken', res.accessToken)
    await AsyncStorage.setItem('refreshToken', res.refreshToken)
    set({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
      userId: res.userId,
      email: res.email,
    })
  },

  logout: async () => {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken'])
    set({
      accessToken: null,
      refreshToken: null,
      userId: null,
      email: null,
    })
  },

  setAuthFromResponse: async (res: AuthResponse) => {
  await AsyncStorage.setItem('accessToken', res.accessToken)
  await AsyncStorage.setItem('refreshToken', res.refreshToken)
  
  set({
    accessToken: res.accessToken,
    refreshToken: res.refreshToken,
    userId: res.userId,
    email: res.email,
  })
},
}))