import { needAuth } from "./Api"
import type {
    ApiResponse,
    BookDTO,
    PagedBooksDTO,
    CreateBookPayload,
    UpdateBookPayload,
} from "../types/apiTypes"

// ─── List books (paginated) ───
export const fetchBooks = async (page = 1, pageSize = 10): Promise<PagedBooksDTO> => {
    const { data: res } = await needAuth.get<ApiResponse<PagedBooksDTO>>("/books", {
        params: { page, pageSize },
    })
    return res.data
}

// ─── Get single book ───
export const getBook = async (id: string): Promise<BookDTO> => {
    const { data: res } = await needAuth.get<ApiResponse<BookDTO>>(`/books/${id}`)
    return res.data
}

// ─── Create book ───
export const createBook = async (payload: CreateBookPayload): Promise<BookDTO> => {
    const { data: res } = await needAuth.post<ApiResponse<BookDTO>>("/books", payload)
    return res.data
}

// ─── Update book ───
export const updateBook = async (id: string, payload: UpdateBookPayload): Promise<BookDTO> => {
    const { data: res } = await needAuth.put<ApiResponse<BookDTO>>(`/books/${id}`, payload)
    return res.data
}

// ─── Delete book ───
export const deleteBook = async (id: string): Promise<void> => {
    await needAuth.delete(`/books/${id}`)
}

export default {
    fetchBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
}
