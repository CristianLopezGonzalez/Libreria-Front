import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react/jsx-dev-runtime";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth()
  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth()
  if (auth.isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  return children
}