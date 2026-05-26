import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../api/Auth"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            setError("Please fill in all fields")
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const res = await login({ email, password })
            console.log("USER:", res.user)
            console.log("TOKEN:", res.token)

            navigate("/home")

        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
                <div className="flex items-center justify-center px-6 py-12">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-md"
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                            Libreria
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-[0.2em] text-slate-900">
                            INICIAR SESION
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Accede a tu cuenta para continuar
                        </p>

                        {error && (
                            <p className="mt-6 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-center text-sm text-red-600">
                                {error}
                            </p>
                        )}

                        <div className="mt-6 space-y-4">
                            <label className="block text-sm font-medium text-slate-700">
                                Email
                                <input
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                                />
                            </label>

                            <label className="block text-sm font-medium text-slate-700">
                                Contrasena
                                <input
                                    type="password"
                                    placeholder="Tu contrasena"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                                />
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isLoading ? "Ingresando..." : "Entrar"}
                        </button>

                        <p className="mt-5 text-center text-sm text-slate-500">
                            No tienes cuenta?{" "}
                            <Link
                                to="/register"
                                className="font-semibold text-brand-600 transition hover:text-brand-700"
                            >
                                Registrate
                            </Link>
                        </p>
                    </form>
                </div>

                <div className="relative hidden lg:block">
                    <div className="absolute inset-0 bg-slate-100">
                        <div className="flex h-full w-full items-center justify-center border-l border-slate-200 opacity-90" style={{ backgroundImage: "url('/banner-login.avif')", backgroundSize: "cover", backgroundPosition: "center" }}>
                            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                                
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login