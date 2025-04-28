import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
import { FaArrowLeft } from 'react-icons/fa'

const EditarUsuarioAdmin = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    rol: 'alumno'
  })

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/usuarios/${id}`)
        const data = await res.json()
        if (res.ok) {
          setUsuario(data)
        } else {
          toast.error('No se pudo obtener el usuario')
        }
      } catch (err) {
        console.error(err)
        toast.error('Error de red')
      }
    }

    fetchUsuario()
  }, [id])

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validaciones antes de enviar
    if (usuario.nombre.trim().length < 3) {
      return toast.error('El nombre debe tener al menos 3 caracteres')
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regexEmail.test(usuario.email)) {
      return toast.error('Debe ingresar un email válido')
    }

    if (!['admin', 'docente', 'alumno'].includes(usuario.rol)) {
      return toast.error('Debe seleccionar un rol válido')
    }

    try {
      const res = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      })

      if (res.ok) {
        toast.success('Usuario actualizado')
        setTimeout(() => navigate('/admin/usuarios'), 2000)
      } else {
        toast.error('No se pudo actualizar')
      }
    } catch (err) {
      console.error(err)
      toast.error('Error de red')
    }
  }

  return (
    <div className="min-h-screen bg-[#2b1e1e] text-[#f2a6a6] p-8 font-serif">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-6">Editar Usuario</h2>

        <form onSubmit={handleSubmit} className="bg-[#3b2c2c] p-6 rounded shadow space-y-4">
          <div>
            <label className="block mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={usuario.nombre}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#4b3b3b] text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={usuario.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#4b3b3b] text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Rol</label>
            <select
              name="rol"
              value={usuario.rol}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#4b3b3b] text-white"
            >
              <option value="admin">Administrador</option>
              <option value="docente">Docente</option>
              <option value="alumno">Alumno</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => {
                Swal.fire({
                  title: '¿Cancelar edición?',
                  text: 'Los cambios no guardados se perderán',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Sí, volver',
                  cancelButtonText: 'Seguir editando'
                }).then((result) => {
                  if (result.isConfirmed) {
                    navigate('/admin/usuarios')
                  }
                })
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-[#e26868] hover:bg-[#d75151] text-white py-2 px-4 rounded"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  )
}

export default EditarUsuarioAdmin
