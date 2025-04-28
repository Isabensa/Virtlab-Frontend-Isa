import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa'
import Swal from 'sweetalert2'

const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([])
  const [page, setPage] = useState(1)            
  const [totalPages, setTotalPages] = useState(1)   
  const navigate = useNavigate()

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const token = localStorage.getItem('token') 
        const res = await fetch(`http://localhost:5000/api/usuarios?page=${page}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        const data = await res.json()
        setUsuarios(data.usuarios)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.error('Error al obtener usuarios:', error)
      }
    }

    obtenerUsuarios()
  }, [page]) 

  const eliminarUsuario = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar usuario?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (confirm.isConfirmed) {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })

        const data = await res.json()
        if (res.ok) {
          Swal.fire('¡Eliminado!', data.mensaje, 'success')
          setUsuarios(usuarios.filter((usuario) => usuario._id !== id))
        } else {
          Swal.fire('Error', data.mensaje || 'No se pudo eliminar.', 'error')
        }
      } catch (error) {
        console.error('Error al eliminar usuario:', error)
        Swal.fire('Error', 'Error de red.', 'error')
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#2b1e1e] text-[#f2a6a6] p-8 font-serif">
      <h2 className="text-3xl font-bold mb-6 text-center">Gestión de Usuarios</h2>

      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate('/admin')}
          className="bg-[#444] hover:bg-[#666] text-white text-sm px-4 py-2 rounded shadow flex items-center gap-2"
        >
          Volver
        </button>

        <button
          onClick={() => navigate('/admin/usuarios/crear')}
          className="bg-[#e26868] hover:bg-[#d75151] text-white text-sm px-4 py-2 rounded shadow"
        >
          Agregar Usuario
        </button>
      </div>

      <table className="w-full table-auto border-collapse mb-6">
        <thead className="bg-[#e26868] text-white">
          <tr className="h-12">
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Rol</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario._id} className="hover:bg-[#3e2e2e] text-white h-14">
              <td className="px-4 py-2 border">{usuario.nombre}</td>
              <td className="px-4 py-2 border">{usuario.email}</td>
              <td className="px-4 py-2 border">{usuario.rol}</td>
              <td className="px-4 py-2 border">
                <div className="flex gap-2 justify-center">
                  <button
                    title="Ver"
                    onClick={() => navigate(`/admin/usuarios/${usuario._id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded text-xs"
                  >
                    <FaEye />
                  </button>
                  <button
                    title="Editar"
                    onClick={() => navigate(`/admin/usuarios/editar/${usuario._id}`)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black p-1 rounded text-xs"
                  >
                    <FaEdit />
                  </button>
                  <button
                    title="Eliminar"
                    onClick={() => eliminarUsuario(usuario._id)}
                    className="bg-red-600 hover:bg-red-700 text-white p-1 rounded text-xs"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Controles de paginado */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-[#e26868] hover:bg-[#d75151] text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>Página {page} de {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="bg-[#e26868] hover:bg-[#d75151] text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default UsuariosAdmin
