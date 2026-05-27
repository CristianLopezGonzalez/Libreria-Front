import Navbar from "../components/Navbar"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import { updateUser } from "../api/Users"
import { useAuthStore } from "../stores/authStore"
import { getProfile } from "../api/Auth"

const Profile = () => {
    const auth = useAuth()
    const setUser = useAuthStore((s) => s.setUser)

    const [isEditing, setIsEditing] = useState(false)
    const [nick, setNick] = useState(auth.user?.nick || "")
    const [email, setEmail] = useState(auth.user?.email || "")
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)

    const handleSave = async () => {
        if (!auth.user) return

        setSaving(true)
        setError(null)
        setMessage(null)

        try {
            await updateUser(auth.user.id, { nick, email })

            // Recargar perfil actualizado desde el backend
            const updatedUser = await getProfile()
            setUser(updatedUser)

            setMessage("Perfil actualizado correctamente")
            setIsEditing(false)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al actualizar")
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <section className="bg-slate-950">
                <main className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_center,_rgba(96,165,250,0.58)_0%,_rgba(59,130,246,0.32)_18%,_rgba(29,78,216,0.16)_36%,_rgba(15,23,42,0)_64%),radial-gradient(circle_at_top_left,_rgba(96,165,250,0.2),_transparent_28%),radial-gradient(circle_at_bottom_center,_rgba(37,99,235,0.22),_transparent_34%),linear-gradient(180deg,_#06111f_0%,_#071a33_46%,_#0b2a56_100%)] bg-cover text-sm text-white max-md:px-4">
                    <Navbar />

                    <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Profile</p>
                        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-[40px]">
                            Your profile
                        </h1>
                        <p className="mt-6 max-w-xl text-base text-white/85">
                            Gestiona tu información personal.
                        </p>

                        {message && (
                            <p className="mt-4 rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
                                {message}
                            </p>
                        )}
                        {error && (
                            <p className="mt-4 rounded-lg border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                                {error}
                            </p>
                        )}

                        <div className="mt-8 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-5 text-left shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs uppercase tracking-[0.2em] text-white/50">Account</span>
                                <span className="text-xs text-white/70">{auth.user?.role || "-"}</span>
                            </div>
                            <div className="mt-4 space-y-3 text-sm text-white/80">
                                <div className="flex items-center justify-between">
                                    <span className="text-white/50">ID</span>
                                    <span className="font-mono text-xs">{auth.user?.id || "-"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-white/50">Nick</span>
                                    {isEditing ? (
                                        <input
                                            value={nick}
                                            onChange={(e) => setNick(e.target.value)}
                                            className="w-40 rounded border border-white/10 bg-slate-950/50 px-2 py-1 text-right text-sm text-white outline-none focus:border-brand-300"
                                        />
                                    ) : (
                                        <span>{auth.user?.nick || "-"}</span>
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-white/50">Email</span>
                                    {isEditing ? (
                                        <input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-40 rounded border border-white/10 bg-slate-950/50 px-2 py-1 text-right text-sm text-white outline-none focus:border-brand-300"
                                        />
                                    ) : (
                                        <span>{auth.user?.email || "-"}</span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-5 flex gap-2">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={handleSave}
                                            disabled={saving}
                                            className="flex-1 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:opacity-60"
                                        >
                                            {saving ? "Guardando..." : "Guardar"}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsEditing(false)
                                                setNick(auth.user?.nick || "")
                                                setEmail(auth.user?.email || "")
                                            }}
                                            className="flex-1 rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition hover:text-white"
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex-1 rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-white/20 hover:text-white"
                                    >
                                        Editar perfil
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    )
}

export default Profile