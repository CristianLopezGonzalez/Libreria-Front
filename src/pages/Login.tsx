import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const auth = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            setError("Please fill in all fields")
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            await auth.login(email, password)
            navigate("/home")
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
                <div className="flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.18),_transparent_38%),linear-gradient(180deg,_#06111f_0%,_#071a33_46%,_#0b2a56_100%)] px-6 py-12">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/8 px-8 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                            Libreria
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-[0.2em] text-white">
                            INICIAR SESION
                        </h2>
                        <p className="mt-2 text-sm text-white/70">
                            Accede a tu cuenta para continuar
                        </p>

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
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Tu contrasena"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/35 px-3 py-2.5 text-sm text-white placeholder:text-white/35 shadow-sm outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-300/30"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/60 hover:text-white"
                                    >
                                        {showPassword ? "Ocultar" : "Ver"}
                                    </button>
                                </div>
                            </label>


                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-6 w-full rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isLoading ? "Ingresando..." : "Entrar"}
                        </button>

                        <p className="mt-5 text-center text-sm text-white/70">
                            No tienes cuenta?{" "}
                            <Link
                                to="/register"
                                className="font-semibold text-brand-300 transition hover:text-white"
                            >
                                Registrate
                            </Link>
                        </p>
                    </form>
                </div>

                <div className="relative hidden lg:block">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(96,165,250,0.36),_transparent_40%),linear-gradient(180deg,_#06111f_0%,_#071a33_52%,_#0b2a56_100%)]">
                        <div className="flex h-full w-full items-center justify-center border-l border-white/10 opacity-90" style={{ backgroundImage: "url('/banner-login.avif')", backgroundSize: "cover", backgroundPosition: "center" }}>
                            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/50">

                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login