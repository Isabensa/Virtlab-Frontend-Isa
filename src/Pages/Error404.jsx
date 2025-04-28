import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Error404 = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-red-600 flex flex-col items-center justify-start text-white pt-8 font-serif">

      {/* Título */}
      <h1 className="text-4xl font-bold mb-6 text-center">404 - PÁGINA NO ENCONTRADA</h1>

      {/* Imagen animada */}
      <motion.img
        src="/404.jpg" 
        alt="Imagen de error"
        className="w-80 h-80 rounded-full border-4 border-white shadow-lg mb-8"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1 }}
      />

      {/* Botón de regreso */}
      <button
        onClick={() => navigate('/')}
        className="bg-white text-red-600 font-bold px-6 py-3 rounded-full shadow hover:bg-gray-200 transition"
      >
        Volver al Inicio
      </button>

    </div>
  )
}

export default Error404
