import Navbar from "../components/Navbar"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchBooks, deleteBook } from "../api/Books"
import type { BookDTO } from "../types/apiTypes"

const Library = () => {
    const [books, setBooks] = useState<BookDTO[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Paginación
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const pageSize = 10

    const navigate = useNavigate()

    const loadBooks = async (p: number) => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetchBooks(p, pageSize)
            setBooks(res.books)
            setTotalPages(res.totalPages)
            setPage(res.page)
        } catch (err: any) {
            console.error(err)
            if (err?.response?.status === 401) {
                navigate("/")
                return
            }
            setError("No se pudieron cargar los libros")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadBooks(page)
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de que quieres eliminar este libro?")) return
        try {
            await deleteBook(id)
            // Recargar la página actual
            await loadBooks(page)
        } catch (err) {
            console.error("Error deleting book:", err)
            setError("Error al eliminar el libro")
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <section className="bg-slate-950">
                <main className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_center,_rgba(96,165,250,0.58)_0%,_rgba(59,130,246,0.32)_18%,_rgba(29,78,216,0.16)_36%,_rgba(15,23,42,0)_64%),radial-gradient(circle_at_top_left,_rgba(96,165,250,0.2),_transparent_28%),radial-gradient(circle_at_bottom_center,_rgba(37,99,235,0.22),_transparent_34%),linear-gradient(180deg,_#06111f_0%,_#071a33_46%,_#0b2a56_100%)] bg-cover text-sm text-white max-md:px-4">
                    <Navbar />

                    <div className="relative z-10 flex flex-1 flex-col items-center justify-start text-center px-6 py-12 w-full">
                        <div className="max-w-4xl w-full">
                            <div className="flex items-center justify-between">
                                <div className="text-left">
                                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Library</p>
                                    <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-[40px]">Manage your books</h1>
                                </div>
                                <Link
                                    to="/create-book"
                                    className="mt-2 inline-flex rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100"
                                >
                                    Crear libros
                                </Link>
                            </div>

                            <div className="mt-8">
                                {loading && <p>Cargando libros...</p>}
                                {error && <p className="text-red-400">{error}</p>}
                                {!loading && !error && books.length === 0 && <p className="text-white/60">No tienes libros todavía.</p>}

                                <ul className="mt-4 space-y-4">
                                    {books.map((b) => (
                                        <li key={b.id} className="rounded-lg border border-white/6 bg-white/3 p-4 text-left">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-white">{b.title}</h3>
                                                    <p className="text-sm text-white/70">{b.author?.name || 'Unknown author'}</p>
                                                    {b.description && (
                                                        <p className="mt-1 text-xs text-white/50">{b.description}</p>
                                                    )}
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        {b.category?.name && (
                                                            <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/60">
                                                                {b.category.name}
                                                            </span>
                                                        )}
                                                        {b.editorial?.name && (
                                                            <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/60">
                                                                {b.editorial.name}
                                                            </span>
                                                        )}
                                                        {b.isbn && (
                                                            <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/40 font-mono">
                                                                ISBN: {b.isbn}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <span className="text-xs text-white/40">
                                                        {new Date(b.createdAt).toLocaleDateString()}
                                                    </span>
                                                    <button
                                                        onClick={() => handleDelete(b.id)}
                                                        className="rounded-lg border border-red-400/20 px-3 py-1 text-xs text-red-300 transition hover:bg-red-500/10"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Paginación */}
                                {totalPages > 1 && (
                                    <div className="mt-8 flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => loadBooks(page - 1)}
                                            disabled={page <= 1}
                                            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            ← Anterior
                                        </button>
                                        <span className="text-sm text-white/60">
                                            Página {page} de {totalPages}
                                        </span>
                                        <button
                                            onClick={() => loadBooks(page + 1)}
                                            disabled={page >= totalPages}
                                            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            Siguiente →
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    )
}

export default Library