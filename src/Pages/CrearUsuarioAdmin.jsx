import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'

const CrearUsuarioAdmin = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rol, setRol] = useState('alumno')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validaciones antes de enviar
    if (nombre.trim().length < 3) {
      return toast.error('El nombre debe tener al menos 3 caracteres')
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regexEmail.test(email)) {
      return toast.error('Debe ingresar un email válido')
    }

    if (password.length < 6) {
      return toast.error('La contraseña debe tener al menos 6 caracteres')
    }

    if (!['admin', 'docente', 'alumno'].includes(rol)) {
      return toast.error('Debe seleccionar un rol válido')
    }

    try {
      const response = await fetch('http://localhost:5000/api/usuarios/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password, rol }),
      })

      if (response.ok) {
        toast.success('Usuario creado correctamente')
        setNombre('')
        setEmail('')
        setPassword('')
        setRol('alumno')
        setTimeout(() => navigate('/admin/usuarios'), 2000)
      } else {
        const errorData = await response.json()
        toast.error(errorData.mensaje || 'Error al crear usuario')
      }
    } catch (error) {
      console.error('Error al crear usuario:', error)
      toast.error('Error de conexión con el servidor')
    }
  }

  return (
    <div className="min-h-screen bg-[#2b1e1e] text-[#f2a6a6] p-8 font-serif">
      <h2 className="text-3xl font-bold mb-6">Agregar Usuario</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-[#3b2c2c] p-6 rounded shadow"
      >
        <div className="mb-4">
          <label className="block mb-1">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-2 rounded bg-[#4b3b3b] text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-[#4b3b3b] text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-[#4b3b3b] text-white"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1">Rol</label>
          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
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
                title: '¿Cancelar creación?',
                text: 'Los datos ingresados se perderán',
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
            className="bg-[#e26868] hover:bg-[#d15656] text-white py-2 px-4 rounded"
          >
            Guardar
          </button>
        </div>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  )
}

export default CrearUsuarioAdmin
