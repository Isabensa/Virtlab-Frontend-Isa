import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import TablaClases from '../Components/TablaClases'
import axios from 'axios'

const ClasesAdmin = () => {
  const navigate = useNavigate()
  const [clases, setClases] = useState([])

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:5000/api/clases', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setClases(res.data)
      } catch (error) {
        console.error('Error al obtener clases:', error)
      }
    }

    fetchClases()
  }, [])

  return (
    <div className="min-h-screen bg-[#2b1e1e] text-[#f2a6a6] p-8 font-serif">
      <h2 className="text-3xl font-bold mb-6 text-center">Gestión de Aulas y Recursos</h2>

      {/* LISTADO DE AULAS */}
      <div className="bg-[#3a2f30] p-6 rounded shadow mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Listado de Aulas</h3>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/admin')}
              className="bg-[#444] hover:bg-[#666] text-white text-sm px-4 py-2 rounded shadow flex items-center gap-2"
            >
              Volver
            </button>
            <button
              onClick={() => navigate('/admin/clases/nueva')}
              className="bg-[#e26868] hover:bg-[#d75151] text-white text-sm px-4 py-2 rounded shadow"
            >
              Crear Aula
            </button>
          </div>
        </div>

        {/* PASA LAS CLASES A LA TABLA */}
        <TablaClases clases={clases} />
      </div>
    </div>
  )
}

export default ClasesAdmin
