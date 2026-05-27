import { noAuth } from "./Api"
import type { ApiResponse, Author } from "../types/apiTypes"

// ─── List all authors (público) ───
export const getAuthors = async (): Promise<Author[]> => {
    const { data: res } = await noAuth.get<ApiResponse<Author[]>>("/authors")
    return res.data
}

// ─── Get author by ID (público) ───
export const getAuthorById = async (id: string): Promise<Author> => {
    const { data: res } = await noAuth.get<ApiResponse<Author>>(`/authors/${id}`)
    return res.data
}
