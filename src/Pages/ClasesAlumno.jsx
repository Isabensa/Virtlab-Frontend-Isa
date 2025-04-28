import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TablaClases from '../Components/TablaClases'

const ClasesAlumno = () => {
  const [clases, setClases] = useState([])
  const [nombreAlumno, setNombreAlumno] = useState('')
  const navigate = useNavigate()

  const idAlumno = localStorage.getItem('idUsuario')

  useEffect(() => {
    const obtenerClases = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/clases')
        const data = await res.json()

        console.log('🔵 Clases cargadas:', data)
        console.log('🟡 ID Alumno:', idAlumno)

     
        const clasesAsignadas = data.filter((clase) =>
          clase.alumnos.includes(idAlumno)
        )

        setClases(clasesAsignadas)

      
        const nombreGuardado = localStorage.getItem('nombreUsuario')
        setNombreAlumno(nombreGuardado || 'Alumno')
      } catch (error) {
        console.error('Error al obtener clases:', error)
      }
    }

    obtenerClases()
  }, [idAlumno])

  return (
    <div className="min-h-screen bg-[#2b1e1e] text-[#f2a6a6] p-8 font-serif flex flex-col gap-6">
      
      {/* Título Bienvenida */}
      <h2 className="text-4xl font-bold text-center">
        Bienvenido {nombreAlumno}
      </h2>

      {/* Tabla de Clases */}
      {clases.length === 0 ? (
        <p className="text-center mt-4">No estás asignado a ninguna clase todavía.</p>
      ) : (
        <TablaClases clases={clases} />
      )}

      {/* Botón Gestión NASA */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate('/nasa')}
          className="bg-[#3a2f30] hover:bg-[#574141] px-6 py-3 rounded shadow text-lg"
        >
          🚀 Gestión NASA
        </button>
      </div>
    </div>
  )
}

export default ClasesAlumno
