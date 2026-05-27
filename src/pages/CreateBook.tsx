import Navbar from "../components/Navbar"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { createBook } from "../api/Books"
import { getAuthors } from "../api/Authors"
import { getCategories } from "../api/Categories"
import { getEditorials } from "../api/Editorials"
import type { Author, Category, Editorial } from "../types/apiTypes"

const CreateBook = () => {
    const navigate = useNavigate()

    // Form fields
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isbn, setIsbn] = useState("")
    const [authorId, setAuthorId] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [editorialId, setEditorialId] = useState("")

    // Selects data
    const [authors, setAuthors] = useState<Author[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [editorials, setEditorials] = useState<Editorial[]>([])

    // UI state
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [loadingData, setLoadingData] = useState(true)

    // Cargar autores, categorías y editoriales al montar
    useEffect(() => {
        const loadData = async () => {
            try {
                const [authorsRes, categoriesRes, editorialsRes] = await Promise.all([
                    getAuthors(),
                    getCategories(),
                    getEditorials(),
                ])
                setAuthors(authorsRes)
                setCategories(categoriesRes)
                setEditorials(editorialsRes)
            } catch (err) {
                console.error("Error loading form data:", err)
                setError("Error al cargar datos del formulario")
            } finally {
                setLoadingData(false)
            }
        }
        loadData()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title || !isbn || !authorId || !categoryId || !editorialId) {
            setError("Completa todos los campos obligatorios")
            return
        }

        setIsLoading(true)
        setError(null)
        setSuccess(null)

        try {
            await createBook({
                title,
                description: description || undefined,
                isbn,
                authorId,
                categoryId,
                editorialId,
            })

            setSuccess("Libro creado correctamente")
            setTimeout(() => navigate("/library"), 1500)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al crear el libro")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <section className="bg-slate-950">
                <main className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_center,_rgba(96,165,250,0.58)_0%,_rgba(59,130,246,0.32)_18%,_rgba(29,78,216,0.16)_36%,_rgba(15,23,42,0)_64%),radial-gradient(circle_at_top_left,_rgba(96,165,250,0.2),_transparent_28%),radial-gradient(circle_at_bottom_center,_rgba(37,99,235,0.22),_transparent_34%),linear-gradient(180deg,_#06111f_0%,_#071a33_46%,_#0b2a56_100%)] bg-cover text-sm text-white max-md:px-4">
                    <Navbar />

                    <div className="relative z-10 flex flex-1 flex-col items-center justify-start px-6 py-12">
                        <div className="w-full max-w-lg">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Create book</p>
                            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-[40px]">
                                Crear libro
                            </h1>

                            {success && (
                                <p className="mt-6 rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-center text-sm text-emerald-200">
                                    {success}
                                </p>
                            )}
                            {error && (
                                <p className="mt-6 rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-center text-sm text-red-200">
                                    {error}
                                </p>
                            )}

                            {loadingData ? (
                                <p className="mt-8 text-white/60">Cargando datos del formulario...</p>
                            ) : (
                                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                                    <label className="block text-sm font-medium text-white/80">
                                        Título *
                                        <input
                                            type="text"
                                            placeholder="Nombre del libro"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/35 px-3 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-300/30"
                                        />
                                    </label>

                                    <label className="block text-sm font-medium text-white/80">
                                        Descripción
                                        <textarea
                                            placeholder="Descripción del libro (opcional)"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows={3}
                                            className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-slate-950/35 px-3 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-300/30"
                                        />
                                    </label>

                                    <label className="block text-sm font-medium text-white/80">
                                        ISBN *
                                        <input
                                            type="text"
                                            placeholder="978-3-16-148410-0"
                                            value={isbn}
                                            onChange={(e) => setIsbn(e.target.value)}
                                            className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/35 px-3 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-300/30"
                                        />
                                    </label>

                                    <label className="block text-sm font-medium text-white/80">
                                        Autor *
                                        <select
                                            value={authorId}
                                            onChange={(e) => setAuthorId(e.target.value)}
                                            className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm text-white outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-300/30"
                                        >
                                            <option value="">Selecciona un autor</option>
                                            {authors.map((a) => (
                                                <option key={a.id} value={a.id}>{a.name}</option>
                                            ))}
                                        </select>
                                    </label>

                                    <label className="block text-sm font-medium text-white/80">
                                        Categoría *
                                        <select
                                            value={categoryId}
                                            onChange={(e) => setCategoryId(e.target.value)}
                                            className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm text-white outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-300/30"
                                        >
                                            <option value="">Selecciona una categoría</option>
                                            {categories.map((c) => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                    </label>

                                    <label className="block text-sm font-medium text-white/80">
                                        Editorial *
                                        <select
                                            value={editorialId}
                                            onChange={(e) => setEditorialId(e.target.value)}
                                            className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm text-white outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-300/30"
                                        >
                                            <option value="">Selecciona una editorial</option>
                                            {editorials.map((e) => (
                                                <option key={e.id} value={e.id}>{e.name}</option>
                                            ))}
                                        </select>
                                    </label>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="mt-4 w-full rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isLoading ? "Creando..." : "Crear libro"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </main>
            </section>
        </div>
    )
}

export default CreateBook