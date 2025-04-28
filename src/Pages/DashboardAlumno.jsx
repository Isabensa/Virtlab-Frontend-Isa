import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const DashboardAlumno = () => {
  const navigate = useNavigate()

  const cerrarSesion = () => {
    localStorage.clear()
    toast.success('Sesión cerrada correctamente')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#2b1e1e] text-[#f2a6a6] flex justify-center items-center font-serif">
      <div className="bg-[#3a2f30] border border-pink-500 p-8 rounded shadow-lg w-full max-w-md text-center space-y-6">

        {/* Imagen de Alumno */}
        <img
          src="/alumno.png"
          alt="Alumno"
          className="w-20 h-20 rounded-full mx-auto border-4 border-pink-300 shadow hover:opacity-80 cursor-pointer transition"
          onClick={() => navigate('/selector')}
        />

        <h2 className="text-3xl font-bold underline">Panel del Alumno</h2>
        <p className="italic">Bienvenido/a</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate('/alumno/clases')}
            className="bg-[#e26868] hover:bg-[#d75151] text-white px-4 py-2 rounded shadow"
          >
            📘 Ver Mis Clases
          </button>

          <button
            onClick={() => navigate('/nasa')}
            className="bg-[#e26868] hover:bg-[#d75151] text-white px-4 py-2 rounded shadow"
          >
            Gestión NASA
          </button>
        </div>

        <button
          onClick={cerrarSesion}
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mt-6"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}

export default DashboardAlumno
