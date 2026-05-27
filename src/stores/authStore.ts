import { create } from "zustand"
import type { AuthUser } from "../types/apiTypes"
import * as authApi from "../api/Auth"

interface AuthState {
    user: AuthUser | null
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean

    // Acciones
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string, nick: string) => Promise<void>
    logout: () => Promise<void>
    checkAuth: () => Promise<void>
    setUser: (user: AuthUser | null) => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
    isLoading: true, // true hasta que se verifique el token inicial

    login: async (email: string, password: string) => {
        const result = await authApi.login(email, password)
        set({
            user: result.user,
            token: result.token,
            isAuthenticated: true,
        })
    },

    register: async (email: string, password: string, nick: string) => {
        const result = await authApi.register(email, password, nick)
        set({
            user: result.user,
            token: result.token,
            isAuthenticated: true,
        })
    },

    logout: async () => {
        await authApi.logout()
        set({
            user: null,
            token: null,
            isAuthenticated: false,
        })
    },

    // Verificar si el token en localStorage es válido al cargar la app
    checkAuth: async () => {
        const token = localStorage.getItem("token")

        if (!token) {
            set({ user: null, token: null, isAuthenticated: false, isLoading: false })
            return
        }

        try {
            const user = await authApi.getProfile()
            set({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
            })
        } catch {
            // Token inválido o expirado (el interceptor ya intentó refresh)
            localStorage.removeItem("token")
            set({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
            })
        }
    },

    setUser: (user: AuthUser | null) => {
        set({ user })
    },
}))
