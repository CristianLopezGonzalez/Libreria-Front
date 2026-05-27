import { needAuth } from "./Api"
import type { ApiResponse, UserDTO, UpdateUserPayload } from "../types/apiTypes"

// ─── Get user by ID ───
export const getUserById = async (id: string): Promise<UserDTO> => {
    const { data: res } = await needAuth.get<ApiResponse<UserDTO>>(`/users/${id}`)
    return res.data
}

// ─── Update user ───
export const updateUser = async (id: string, payload: UpdateUserPayload): Promise<{ message: string }> => {
    const { data: res } = await needAuth.put<ApiResponse<{ message: string }>>(`/users/${id}`, payload)
    return res.data
}

// ─── Delete user ───
export const deleteUser = async (id: string): Promise<void> => {
    await needAuth.delete(`/users/${id}`)
}
