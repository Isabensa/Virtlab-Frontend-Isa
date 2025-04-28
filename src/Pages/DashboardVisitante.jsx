import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import NasaView from './NasaView'

const DashboardVisitante = () => {
  const navigate = useNavigate()

  const cerrarSesion = () => {
    localStorage.clear()
    toast.success('Sesión cerrada correctamente')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#2b1e1e] text-[#f2a6a6] p-8 font-serif flex flex-col min-h-screen">
      
      <h2 className="text-4xl font-bold text-center mb-6">
        Bienvenido, forastero curioso
      </h2>

      {/* Botón Cerrar sesión */}
      <div className="flex justify-center mb-6">
        <button
          onClick={cerrarSesion}
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Vista NASA */}
      <div className="flex-grow">
        <NasaView />
      </div>

    </div>
  )
}

export default DashboardVisitante
