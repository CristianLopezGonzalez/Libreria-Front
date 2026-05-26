import { logout } from '../api/Auth'
import { useNavigate } from "react-router-dom"


const Home = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    setTimeout(() => { navigate("/") }, 1000)
  }
  return (
    <div>

      <button
        className='bg-red-500 text-white px-4 py-2 rounded'
        onClick={handleLogout}>logout

      </button>

    </div>
  )
}

export default Home