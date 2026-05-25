import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import { PrivateRoute } from "./routes/PrivateRoutes"
import Register from "./pages/Register"

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* pública */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* protegida */}
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    )
}

export default App