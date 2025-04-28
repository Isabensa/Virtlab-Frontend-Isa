import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const VerUsuario = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/usuarios/${id}`)
        if (res.ok) {
          const data = await res.json()
          setUsuario(data)
        } else {
          alert('Usuario no encontrado')
          navigate('/admin/usuarios')
        }
      } catch (error) {
        console.error('Error al obtener usuario:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsuario()
  }, [id, navigate])

  if (loading) return <p className="text-center text-white">Cargando...</p>
  if (!usuario) return null

  return (
    <div className="min-h-screen bg-[#2b1e1e] text-[#f2a6a6] p-8 font-serif">
      <h2 className="text-3xl font-bold mb-6">Detalle de Usuario</h2>
      <div className="max-w-md mx-auto bg-[#3b2c2c] p-6 rounded shadow">
        <p className="mb-4"><strong>Nombre:</strong> {usuario.nombre}</p>
        <p className="mb-4"><strong>Email:</strong> {usuario.email}</p>
        <p className="mb-4"><strong>Rol:</strong> {usuario.rol}</p>
        <button
          onClick={() => navigate('/admin/usuarios')}
          className="bg-[#e26868] hover:bg-[#d15656] text-white py-2 px-4 rounded"
        >
          Volver
        </button>
      </div>
    </div>
  )
}

export default VerUsuario
