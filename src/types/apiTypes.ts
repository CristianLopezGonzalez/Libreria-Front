// ─── Wrapper genérico de respuesta del backend ───
export interface ApiResponse<T> {
  status: number
  message: string
  data: T
}

export interface ApiValidationError {
  path: string
  message: string
}

export interface ApiErrorResponse {
  status: number
  message: string
  errors?: ApiValidationError[]
}

// ─── Entidades de catálogo ───
export interface Author {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface Editorial {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

// ─── Auth ───
export interface AuthUser {
  id: string
  email: string
  nick: string
  role: "USER" | "ADMIN"
}

export interface AuthResponse {
  user: AuthUser
  token: string
  message?: string
}

export interface RefreshTokenResponse {
  token: string
}

// ─── Books ───
export interface BookDTO {
  id: string
  title: string
  description: string
  isbn: string
  user: { id: string; nick: string }
  author: { name: string }
  category: { name: string }
  editorial: { name: string }
  createdAt: string
  updatedAt: string
}

export interface PagedBooksDTO {
  books: BookDTO[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface CreateBookPayload {
  title: string
  description?: string
  isbn: string
  authorId: string
  categoryId: string
  editorialId: string
}

export interface UpdateBookPayload {
  title?: string
  description?: string
  isbn?: string
  authorId?: string
  categoryId?: string
  editorialId?: string
}

// ─── Users ───
export interface UserDTO {
  id: string
  nick: string
  email: string
  role: "USER" | "ADMIN"
}

export interface UpdateUserPayload {
  nick?: string
  email?: string
}
