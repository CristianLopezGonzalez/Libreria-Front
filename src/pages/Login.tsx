import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white p-6 rounded-lg shadow"
            >
                <h2 className="text-xl font-semibold mb-6 text-center">
                    Login
                </h2>

                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">
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
                    className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    )
}

export default Login