import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const VerClase = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [clase, setClase] = useState(null)

  useEffect(() => {
    const obtenerClase = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/clases/${id}`)
        const data = await res.json()
        setClase(data)
      } catch (error) {
        console.error('Error al obtener clase:', error)
      }
    }

    obtenerClase()
  }, [id])

  if (!clase) return <p className="text-white text-center">Cargando clase...</p>

  return (
    <div className="min-h-screen bg-[#2b1e1e] text-[#f2a6a6] p-8 font-serif">
      <div className="max-w-2xl mx-auto bg-[#3a2f30] p-6 rounded shadow">
        <h2 className="text-3xl font-bold mb-4 text-center">Detalle de la Clase</h2>

        <ul className="space-y-2">
          <li><strong>Tema:</strong> {clase.tema}</li>
          <li><strong>Nombre:</strong> {clase.nombre}</li>
          <li><strong>Nivel:</strong> {clase.nivel}</li>
          <li><strong>Docente:</strong> {clase.docente?.nombre || 'Sin asignar'}</li>
          <li><strong>Descripción:</strong> {clase.descripcion}</li>
          <li><strong>Simulación:</strong> <a className="underline text-blue-300" href={clase.simulacionUrl} target="_blank">Ver</a></li>
          <li><strong>Fecha:</strong> {new Date(clase.fecha).toLocaleDateString()}</li>
          <li><strong>Alumnos:</strong> {clase.alumnos?.length || 0}</li>
        </ul>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-[#444] hover:bg-[#666] text-white px-4 py-2 rounded"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerClase
