import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const FormularioClase = ({ clase, onClaseCreada }) => {
  const [nombre, setNombre] = useState('')
  const [nivel, setNivel] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [docente, setDocente] = useState('')
  const [docentesDisponibles, setDocentesDisponibles] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (clase) {
      setNombre(clase.nombre)
      setNivel(clase.nivel)
      setDescripcion(clase.descripcion)
      setDocente(clase.docente?._id || '')
    }
  }, [clase])

  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const token = localStorage.getItem('token') // ✅ Agregado token

        const res = await fetch('http://localhost:5000/api/usuarios?rol=docente', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })

        const data = await res.json()

        if (res.ok) {
          setDocentesDisponibles(data.usuarios || []) // ✅ Cambiado a data.usuarios
        } else {
          console.error('Error al obtener docentes:', data.mensaje)
          setDocentesDisponibles([])
        }
      } catch (error) {
        console.error('Error al obtener docentes:', error)
        setDocentesDisponibles([])
      }
    }

    fetchDocentes()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validaciones
    if (nombre.trim().length < 3) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre del aula debe tener al menos 3 caracteres'
      })
    }

    if (nivel.trim().length < 3) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nivel debe tener al menos 3 caracteres'
      })
    }

    if (descripcion.trim().length < 3) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La descripción debe tener al menos 3 caracteres'
      })
    }

    if (!docente) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar un docente'
      })
    }

    const datos = {
      nombre,
      nivel,
      descripcion,
      docente
    }

    try {
      const url = clase
        ? `http://localhost:5000/api/clases/${clase._id}`
        : 'http://localhost:5000/api/clases'

      const method = clase ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      })

      const data = await res.json()

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: clase ? 'Aula actualizada' : 'Aula creada',
          confirmButtonColor: '#e26868'
        })
        onClaseCreada()
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.mensaje || 'No se pudo guardar el aula'
        })
      }
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Error de red',
        text: 'Ocurrió un problema en el servidor'
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#3a2f30] p-6 rounded shadow text-white"
    >
      <h3 className="text-2xl font-bold mb-4 text-[#f2a6a6]">
        {clase ? 'Editar Aula' : 'Crear Nueva Aula'}
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Nombre del aula"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="bg-[#2b1e1e] border border-[#e26868] p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Nivel (ej. Secundario, Universitario)"
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
          className="bg-[#2b1e1e] border border-[#e26868] p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Curso / Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="bg-[#2b1e1e] border border-[#e26868] p-2 rounded"
          required
        />
        <select
          value={docente}
          onChange={(e) => setDocente(e.target.value)}
          className="bg-[#2b1e1e] border border-[#e26868] p-2 rounded"
          required
        >
          <option value="">Seleccionar docente</option>
          {Array.isArray(docentesDisponibles) && docentesDisponibles.map((d) => (
            <option key={d._id} value={d._id}>
              {d.nombre} - {d.email}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/admin/clases')}
          className="bg-[#2b1e1e] hover:bg-[#1e1515] text-white px-4 py-2 rounded text-sm border border-[#f2a6a6]"
        >
          ⬅ Volver
        </button>
        <button
          type="submit"
          className="bg-[#e26868] hover:bg-[#d75151] text-white px-4 py-2 rounded text-sm"
        >
          {clase ? 'Actualizar Aula' : 'Crear Aula'}
        </button>
      </div>
    </form>
  )
}

export default FormularioClase
