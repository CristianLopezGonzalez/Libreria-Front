import axios from "axios"
import { noAuth, needAuth } from "./Api"
import type { ApiResponse, AuthResponse, AuthUser, RefreshTokenResponse } from "../types/apiTypes"

// ─── Login ───
export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const { data: res } = await noAuth.post<ApiResponse<AuthResponse>>(
            "/auth/login",
            { email, password }
        )

        // Extraer del wrapper { status, message, data }
        localStorage.setItem("token", res.data.token)

        return res.data

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Login failed",
                { cause: error }
            )
        }
        throw error
    }
}

// ─── Register ───
export const register = async (
    email: string,
    password: string,
    nick: string
): Promise<AuthResponse> => {
    try {
        const { data: res } = await noAuth.post<ApiResponse<AuthResponse>>(
            "/auth/register",
            { email, password, nick }
        )

        localStorage.setItem("token", res.data.token)

        return res.data

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Register failed",
                { cause: error }
            )
        }
        throw error
    }
}

// ─── Get Profile ───
export const getProfile = async (): Promise<AuthUser> => {
    try {
        const { data: res } = await needAuth.get<ApiResponse<AuthUser>>(
            "/auth/profile"
        )
        return res.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Failed to get profile",
                { cause: error }
            )
        }
        throw error
    }
}

// ─── Refresh Token ───
export const refreshToken = async (): Promise<string> => {
    try {
        const { data: res } = await noAuth.post<ApiResponse<RefreshTokenResponse>>(
            "/auth/refresh-token"
        )

        const newToken = res.data.token
        localStorage.setItem("token", newToken)
        return newToken

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Token refresh failed",
                { cause: error }
            )
        }
        throw error
    }
}

// ─── Logout ───
export const logout = async (): Promise<void> => {
    try {
        // Llamar al backend para invalidar refresh tokens en el servidor
        await needAuth.post("/auth/logout")
    } catch {
        // Incluso si el backend falla, limpiar localmente
    } finally {
        localStorage.removeItem("token")
    }
}