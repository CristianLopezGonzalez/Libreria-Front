import { noAuth } from "./Api"
import type { ApiResponse, Editorial } from "../types/apiTypes"

// ─── List all editorials (público) ───
export const getEditorials = async (): Promise<Editorial[]> => {
    const { data: res } = await noAuth.get<ApiResponse<Editorial[]>>("/editorials")
    return res.data
}

// ─── Get editorial by ID (público) ───
export const getEditorialById = async (id: string): Promise<Editorial> => {
    const { data: res } = await noAuth.get<ApiResponse<Editorial>>(`/editorials/${id}`)
    return res.data
}
