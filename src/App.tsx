import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { PrivateRoute, PublicRoute } from "./routes/PrivateRoutes";
import Register from "./pages/Register";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import CreateBook from "./pages/CreateBook";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        {/* pública */}

        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* protegida */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/library"
          element={
            <PrivateRoute>
              <Library />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-book"
          element={
            <PrivateRoute>
              <CreateBook />
            </PrivateRoute>
          }
        />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
