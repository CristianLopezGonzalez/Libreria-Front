import axios from "axios"
import type { ApiResponse, RefreshTokenResponse } from "../types/apiTypes"

const BASE_URL = "http://localhost:3000/api"

// ─── Instancia SIN autenticación (login, register) ───
export const noAuth = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

// ─── Instancia CON autenticación (Bearer token) ───
export const needAuth = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

// ─── Request interceptor: adjuntar token ───
needAuth.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

// ─── Response interceptor: refresh automático en 401 ───
let isRefreshing = false
let failedQueue: Array<{
    resolve: (token: string) => void
    reject: (error: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error)
        } else {
            resolve(token!)
        }
    })
    failedQueue = []
}

needAuth.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        // Solo interceptar 401 y evitar loops
        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error)
        }

        // Si ya estamos refrescando, encolar la request
        if (isRefreshing) {
            return new Promise<string>((resolve, reject) => {
                failedQueue.push({ resolve, reject })
            }).then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`
                return needAuth(originalRequest)
            })
        }

        originalRequest._retry = true
        isRefreshing = true

        try {
            // Intentar refresh con la cookie httpOnly
            const { data } = await noAuth.post<ApiResponse<RefreshTokenResponse>>(
                "/auth/refresh-token"
            )

            const newToken = data.data.token
            localStorage.setItem("token", newToken)

            // Reintentar la request original y desencolar las pendientes
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            processQueue(null, newToken)

            return needAuth(originalRequest)
        } catch (refreshError) {
            // Refresh falló: limpiar sesión y redirigir
            processQueue(refreshError, null)
            localStorage.removeItem("token")
            window.location.href = "/"
            return Promise.reject(refreshError)
        } finally {
            isRefreshing = false
        }
    }
)