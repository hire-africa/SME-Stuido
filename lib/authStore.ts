import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthUser {
  id: string
  email: string
  fullName: string
  businessName: string
  phone?: string
  avatar?: string
  role: 'CLIENT' | 'ADMIN'
  subscriptionActive: boolean
  subscriptionPlan?: string
  subscriptionEndDate?: string
  documentsRemaining?: number
}

interface AuthState {
  token: string | null
  user: AuthUser | null
  isLoading: boolean
  error: string | null

  // Actions
  setToken: (token: string | null) => void
  setUser: (user: AuthUser | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, fullName: string, businessName: string, phone?: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: () => boolean
  isAdmin: () => boolean
  refreshUser: () => Promise<boolean>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLoading: false,
      error: null,

      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })

          const data = await response.json()

          if (!response.ok) {
            set({ error: data.error || 'Login failed', isLoading: false })
            return false
          }

          set({
            token: data.data.token,
            user: data.data.user,
            isLoading: false,
            error: null,
          })

          return true
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Login failed'
          set({ error: errorMessage, isLoading: false })
          return false
        }
      },

      signup: async (
        email: string,
        password: string,
        fullName: string,
        businessName: string,
        phone?: string
      ) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              password,
              fullName,
              businessName,
              phone,
            }),
          })

          const data = await response.json()

          if (!response.ok) {
            set({ error: data.error || 'Signup failed', isLoading: false })
            return false
          }

          set({
            token: data.data.token,
            user: data.data.user,
            isLoading: false,
            error: null,
          })

          return true
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Signup failed'
          set({ error: errorMessage, isLoading: false })
          return false
        }
      },

      logout: () => {
        set({ token: null, user: null, error: null })
        // Optional: Call logout API to invalidate token on server
        fetch('/api/auth/logout', { method: 'POST' }).catch(() => {})
      },

      isAuthenticated: () => {
        return get().token !== null && get().user !== null
      },

      isAdmin: () => {
        return get().user?.role === 'ADMIN'
      },

      refreshUser: async () => {
        const token = get().token
        if (!token) return false

        try {
          const response = await fetch('/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` },
          })

          if (!response.ok) return false

          const data = await response.json()
          set({ user: data.data })
          return true
        } catch (error) {
          console.error('Failed to refresh user:', error)
          return false
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
)
