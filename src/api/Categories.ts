import { noAuth } from "./Api"
import type { ApiResponse, Category } from "../types/apiTypes"

// ─── List all categories (público) ───
export const getCategories = async (): Promise<Category[]> => {
    const { data: res } = await noAuth.get<ApiResponse<Category[]>>("/categories")
    return res.data
}

// ─── Get category by ID (público) ───
export const getCategoryById = async (id: string): Promise<Category> => {
    const { data: res } = await noAuth.get<ApiResponse<Category>>(`/categories/${id}`)
    return res.data
}
