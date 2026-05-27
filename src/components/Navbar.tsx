import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await auth.logout()
        navigate("/")
    }

    return (
        <nav className="flex w-full items-center justify-between py-4 md:px-16 lg:px-24 xl:px-32">
            <a href="https://prebuiltui.com" className="text-white">
                <img src="/logo.png" alt="logo" width="100" height="40" />
            </a>
            <div id="menu"
                className="max-md:absolute max-md:bg-black/40 max-md:h-[785px] max-md:w-0 max-md:overflow-hidden max-md:transition-[width] max-md:duration-300 max-md:top-0 max-md:left-0 max-md:flex-col max-md:justify-center max-md:text-lg max-md:backdrop-blur flex items-center gap-8 font-medium text-white/80">
                <Link to="/home" className="transition hover:text-white">
                    Home
                </Link>
                <Link to="/library" className="transition hover:text-white">
                    Library
                </Link>
                <Link to="/profile" className="transition hover:text-white">
                    Profile
                </Link>
            </div>
            <button
                onClick={handleLogout}
                className="max-md:hidden rounded-full border border-white/20 bg-white px-6 py-2 text-slate-900 shadow-sm transition active:scale-95 hover:bg-slate-100">
                LOGOUT
            </button>
        </nav>
    )
}

export default Navbar