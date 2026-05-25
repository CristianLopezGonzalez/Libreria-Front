import { useState } from "react"
import { register } from "../api/Auth"
import { useNavigate } from "react-router-dom"

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold mb-6 text-center">
          Register
        </h2>

        {success && (
          <p className="text-green-600 text-sm mb-3 text-center">
            {success}
          </p>
        )}

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        <input
          type="text"
          placeholder="Nickname"
          value={nick}
          onChange={(e) => setNick(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {isLoading ? "Registrando..." : "Registrar"}
        </button>
      </form>
    </div>
  )
}

export default Register