import axios from "axios"
import { noAuth } from "./Api"

// TYPES
export interface LoginData {
    email: string
    password: string
}

export interface RegisterData {
    email: string
    password: string
    nick: string
}

export interface AuthUser {
    id: string
    email: string
    nick: string
    role: string
}

export interface AuthResponse {
    user: AuthUser
    token: string
    message?: string
}

// LOGIN
export const login = async (loginData: LoginData): Promise<AuthResponse> => {
    try {
        const { data: res } = await noAuth.post<AuthResponse>(
            "/auth/login",
            loginData
        )

        localStorage.setItem("token", res.token)

        return res

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Login failed"
            )
        }

        throw error
    }
}

// REGISTER
export const register = async (registerData: RegisterData): Promise<AuthResponse> => {
    try {
        const { data: res } = await noAuth.post<AuthResponse>(
            "/auth/register",
            registerData
        )

        localStorage.setItem("token", res.token)

        return res

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Register failed"
            )
        }

        throw error
    }
}

// LOGOUT
export const logout = () => {
    localStorage.removeItem("token")
}