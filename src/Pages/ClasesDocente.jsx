import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TablaClases from '../Components/TablaClases'

const ClasesDocente = () => {
  const [clases, setClases] = useState([])
  const navigate = useNavigate()

  const idDocente = localStorage.getItem('idUsuario')

  useEffect(() => {
    const obtenerClases = async () => {
      try {
        console.log('🟡 ID del docente en localStorage:', idDocente)

        const { data } = await axios.get('http://localhost:5000/api/clases')
        console.log('🔵 Clases del backend:', data)

     
        setClases(data)

      } catch (error) {
        console.error('Error al obtener clases del docente:', error)
      }
    }

    obtenerClases()
  }, [idDocente])

  return (
    <div className="min-h-screen bg-[#2b1e1e] text-[#f2a6a6] p-8 font-serif">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center flex-1">Tus Aulas</h2>
        <button
          onClick={() => navigate('/docente')}
          className="bg-[#444] hover:bg-[#666] text-white text-sm px-4 py-2 rounded shadow"
        >
          ⬅ Volver
        </button>
      </div>

      {clases.length === 0 ? (
        <p className="text-center mt-4">No hay aulas disponibles.</p>
      ) : (
        <TablaClases clases={clases} />
      )}
    </div>
  )
}

export default ClasesDocente
