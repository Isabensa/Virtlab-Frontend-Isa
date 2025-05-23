import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const token = localStorage.getItem('token')

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/" replace />
  }

  // Si hay token, mostrar la ruta protegida
  return <Outlet />
}

export default ProtectedRoute
