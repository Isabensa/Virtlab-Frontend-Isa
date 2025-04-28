import { useNavigate } from 'react-router-dom'

const SelectorPerfiles = () => {
  const navigate = useNavigate()

  const seleccionarPerfil = (rol, ruta) => {
    localStorage.setItem('rol', rol)
    navigate(ruta)
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center font-serif">
      <div className="bg-[#2b1e1e] border border-pink-500 p-8 rounded shadow-lg w-[480px] text-center space-y-8">
        <h1 className="text-3xl font-bold text-white mb-4">¿Quién quiere ingresar?</h1>

        <div className="flex justify-between items-center">
          {/* Admin */}
          <div onClick={() => seleccionarPerfil('admin', '/admin')} className="cursor-pointer flex flex-col items-center">
            <img src="/admin.png" alt="Admin" className="w-20 h-20 rounded-full mb-2" />
            <span className="text-base">Admin</span>
          </div>

          {/* Docente */}
          <div onClick={() => seleccionarPerfil('docente', '/docente')} className="cursor-pointer flex flex-col items-center">
            <img src="/docente.png" alt="Docente" className="w-20 h-20 rounded-full mb-2" />
            <span className="text-base">Docente</span>
          </div>

          {/* Alumno */}
          <div onClick={() => seleccionarPerfil('alumno', '/alumno')} className="cursor-pointer flex flex-col items-center">
            <img src="/alumno.png" alt="Alumno" className="w-20 h-20 rounded-full mb-2" />
            <span className="text-base">Alumno</span>
          </div>

          {/* Visitante */}
          <div onClick={() => seleccionarPerfil('visitante', '/visitante')} className="cursor-pointer flex flex-col items-center">
            <img src="/visitante.png" alt="Visitante" className="w-20 h-20 rounded-full mb-2" />
            <span className="text-base">Visitante</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded w-full text-lg"
        >
          Volver al Login
        </button>
      </div>
    </div>
  )
}

export default SelectorPerfiles
