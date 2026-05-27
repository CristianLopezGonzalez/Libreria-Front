import { createContext, useContext, useEffect, type ReactNode } from "react"
import { useAuthStore } from "../stores/authStore"
import type { AuthUser } from "../types/apiTypes"

// Interfaz del contexto (mapea al store de Zustand)
interface AuthContextType {
    user: AuthUser | null
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string, nick: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const store = useAuthStore()

    // Al montar la app, verificar si hay un token válido
    useEffect(() => {
        store.checkAuth()
    }, [])

    // Pantalla de carga mientras se verifica la autenticación
    if (store.isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    <p className="text-sm text-white/60">Cargando...</p>
                </div>
            </div>
        )
    }

    return (
        <AuthContext.Provider
            value={{
                user: store.user,
                token: store.token,
                isAuthenticated: store.isAuthenticated,
                isLoading: store.isLoading,
                login: store.login,
                register: store.register,
                logout: store.logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
