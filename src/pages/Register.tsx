import { useState } from "react"
import { register } from "../api/Auth"
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nick, setNick] = useState("")

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

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
      const res = await register({ email, password, nick })

      console.log("USER:", res.user)

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
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-slate-100">
            <div className="flex h-full w-full items-center justify-center border-r border-slate-200">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                Imagen de libros aqui
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-12">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Libreria
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[0.2em] text-slate-900">
              CREA TU CUENTA
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Completa tus datos para empezar
            </p>

            {success && (
              <p className="mt-6 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-center text-sm text-emerald-600">
                {success}
              </p>
            )}

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
                  placeholder="Crea una contrasena"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Nickname
                <input
                  type="text"
                  placeholder="Tu nick"
                  value={nick}
                  onChange={(e) => setNick(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Registrando..." : "Crear cuenta"}
            </button>

            <p className="mt-5 text-center text-sm text-slate-500">
              Ya tienes cuenta?{" "}
              <Link
                to="/"
                className="font-semibold text-brand-600 transition hover:text-brand-700"
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