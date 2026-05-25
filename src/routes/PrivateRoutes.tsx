import { Navigate } from "react-router-dom"
import { isAuthenticated } from "../utils/Auth"
import type { JSX } from "react/jsx-dev-runtime"

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />
    }

    return children
}