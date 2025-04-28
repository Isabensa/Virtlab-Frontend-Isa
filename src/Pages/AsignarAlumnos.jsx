import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import Swal from 'sweetalert2'

const AsignarAlumnos = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [clase, setClase] = useState(null)
  const [alumnosDisponibles, setAlumnosDisponibles] = useState([])
  const [alumnosSeleccionados, setAlumnosSeleccionados] = useState([])

  // Obtener aula
  useEffect(() => {
    const fetchClase = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/clases/${id}`)
        const data = await res.json()
        setClase(data)
        setAlumnosSeleccionados(
          data.alumnos.map((a) => ({ value: a._id, label: a.nombre }))
        )
      } catch (error) {
        console.error('Error al obtener el aula:', error)
      }
    }

    fetchClase()
  }, [id])

  // Obtener alumnos disponibles
  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/usuarios?rol=alumno')
        const data = await res.json()
        const opciones = data.map((alumno) => ({
          value: alumno._id,
          label: alumno.nombre
        }))
        setAlumnosDisponibles(opciones)
      } catch (error) {
        console.error('Error al obtener alumnos:', error)
      }
    }

    fetchAlumnos()
  }, [])

  // Guardar asignación
  const guardarAsignacion = async () => {
    // Validar que haya al menos un alumno seleccionado
    if (alumnosSeleccionados.length === 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar al menos un alumno para asignar'
      })
    }

    try {
      const res = await fetch(`http://localhost:5000/api/clases/${id}/alumnos`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          alumnos: alumnosSeleccionados.map((a) => a.value)
        })
      })

      const data = await res.json()

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Alumnos asignados correctamente',
          confirmButtonColor: '#e26868'
        })
        navigate('/admin/clases')
      } else {
        Swal.fire('Error', data.mensaje || 'No se pudo asignar.', 'error')
      }
    } catch (error) {
      console.error(error)
      Swal.fire('Error', 'Error en el servidor', 'error')
    }
  }

  if (!clase) return <p className="text-white text-center">Cargando aula...</p>

  return (
    <div className="min-h-screen bg-[#2b1e1e] text-[#f2a6a6] p-8 font-serif">
      <div className="max-w-3xl mx-auto bg-[#3a2f30] p-6 rounded shadow">
        <h2 className="text-3xl font-bold mb-4 text-center">Asignar Alumnos al Aula</h2>

        <p className="mb-2"><strong>Aula:</strong> {clase.nombre}</p>
        <p className="mb-4"><strong>Curso:</strong> {clase.descripcion}</p>

        <label className="block mb-2 text-white/80">Seleccionar alumnos:</label>
        <Select
          isMulti
          options={alumnosDisponibles}
          value={alumnosSeleccionados}
          onChange={setAlumnosSeleccionados}
          className="mb-6 text-black"
          placeholder="Seleccionar..."
        />

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/admin/clases')}
            className="bg-[#444] hover:bg-[#666] text-white px-4 py-2 rounded"
          >
            ⬅ Volver
          </button>
          <button
            onClick={guardarAsignacion}
            className="bg-[#e26868] hover:bg-[#d75151] text-white px-4 py-2 rounded"
          >
            Guardar Asignación
          </button>
        </div>
      </div>
    </div>
  )
}

export default AsignarAlumnos
