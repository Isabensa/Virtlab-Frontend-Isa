import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const ReportesAdmin = () => {
  const [resumen, setResumen] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const fetchResumen = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/reportes')
        const data = await response.json()
        setResumen(data)
      } catch (error) {
        console.error('Error al obtener reportes:', error)
      }
    }

    fetchResumen()
  }, [])

  return (
    <div className="min-h-screen bg-[#2b1e1e] text-[#f2a6a6] p-8 font-serif">
      {/* Botón Volver */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate('/admin')}
          className="bg-[#444] hover:bg-[#666] text-white text-sm px-4 py-2 rounded shadow flex items-center gap-2"
        >
           Volver
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center">Panel de Reportes</h2>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="bg-[#3e2e2e] p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Usuarios Registrados</h3>
          <p className="text-3xl">{resumen.usuarios || 0}</p>
        </div>

        <div className="bg-[#3e2e2e] p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Clases Activas</h3>
          <p className="text-3xl">{resumen.clases || 0}</p>
        </div>

        <div className="bg-[#3e2e2e] p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Visitas a Simulaciones</h3>
          <p className="text-3xl">{resumen.visitasSimulaciones || 0}</p>
        </div>
      </div>
    </div>
  )
}

export default ReportesAdmin
