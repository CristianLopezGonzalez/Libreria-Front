import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nick, setNick] = useState("")

    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const auth = useAuth()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!email || !password || !nick) {
            setError("All fields are required")
            return
        }

        setIsLoading(true)
        setError(null)
        setSuccess(null)

        try {
            await auth.register(email, password, nick)

            setSuccess("Usuario registrado correctamente")

            setTimeout(() => {
                navigate("/home")
            }, 1500)

        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Register failed"
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
                <div className="relative hidden lg:block">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(96,165,250,0.36),_transparent_40%),linear-gradient(180deg,_#06111f_0%,_#071a33_52%,_#0b2a56_100%)]">
                        <div className="flex h-full w-full items-center justify-center border-r border-white/10">
                            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/50">
                                Imagen de libros aqui
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.18),_transparent_38%),linear-gradient(180deg,_#06111f_0%,_#071a33_46%,_#0b2a56_100%)] px-6 py-12">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/8 px-8 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                            Libreria
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-[0.2em] text-white">
                            CREA TU CUENTA
                        </h2>
                        <p className="mt-2 text-sm text-white/70">
                            Completa tus datos para empezar
                        </p>

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

                        <div className="mt-6 space-y-4">
                            <label className="block text-sm font-medium text-white/80">
                                Email
                                <input
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/35 px-3 py-2.5 text-sm text-white placeholder:text-white/35 shadow-sm outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-300/30"
                                />
                            </label>

                            <label className="block text-sm font-medium text-white/80">
                                Contrasena
                                <input
                                    type="password"
                                    placeholder="Crea una contrasena"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/35 px-3 py-2.5 text-sm text-white placeholder:text-white/35 shadow-sm outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-300/30"
                                />
                            </label>

                            <label className="block text-sm font-medium text-white/80">
                                Nickname
                                <input
                                    type="text"
                                    placeholder="Tu nick"
                                    value={nick}
                                    onChange={(e) => setNick(e.target.value)}
                                    className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/35 px-3 py-2.5 text-sm text-white placeholder:text-white/35 shadow-sm outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-300/30"
                                />
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-6 w-full rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isLoading ? "Registrando..." : "Crear cuenta"}
                        </button>

                        <p className="mt-5 text-center text-sm text-white/70">
                            Ya tienes cuenta?{" "}
                            <Link
                                to="/"
                                className="font-semibold text-brand-300 transition hover:text-white"
                            >
                                Inicia sesion
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register