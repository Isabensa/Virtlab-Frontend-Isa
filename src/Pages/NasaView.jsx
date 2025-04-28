import { useEffect, useState } from 'react'
import axios from 'axios'
import ListaNasa from '../Components/Nasa/ListaNasa'
import ModalFavoritosNasa from '../Components/Nasa/ModalFavoritosNasa'
import { FaSearch, FaHeart } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const NasaView = () => {
  const [query, setQuery] = useState('moon')
  const [resultados, setResultados] = useState([])
  const [favoritos, setFavoritos] = useState([])
  const [mostrarModal, setMostrarModal] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [limite, setLimite] = useState(20)

  const navigate = useNavigate()
  const idUsuario = localStorage.getItem('idUsuario') || 'general'
  const FAVORITOS_KEY = `favoritosNasa_${idUsuario}`

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem(FAVORITOS_KEY)) || []
    setFavoritos(favs)
  }, [])

  const buscarImagenes = async () => {
    try {
      setCargando(true)
      const res = await axios.get(`https://images-api.nasa.gov/search?q=${query}&media_type=image`)
      const filtrados = res.data.collection.items.filter(item => {
        const link = item.links?.[0]?.href
        return link && (link.endsWith('.jpg') || link.endsWith('.jpeg') || link.endsWith('.png'))
      })
      setResultados(filtrados)
    } catch (error) {
      console.error('Error al buscar imágenes:', error)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    buscarImagenes()
  }, [])

  const toggleFavorito = (item) => {
    const id = item.data[0].nasa_id
    const yaEsta = favoritos.some(fav => fav.data[0]?.nasa_id === id)
    const nuevos = yaEsta
      ? favoritos.filter(fav => fav.data[0]?.nasa_id !== id)
      : [...favoritos, item]
    setFavoritos(nuevos)
    localStorage.setItem(FAVORITOS_KEY, JSON.stringify(nuevos))
  }

  const volverAlPanel = () => {
    const rol = localStorage.getItem('rol')
    const rutasPorRol = {
      admin: '/admin',
      docente: '/docente',
      alumno: '/alumno',
      visitante: '/visitante',
    }
    navigate(rutasPorRol[rol] || '/')
  }

  return (
    <div className="p-6 min-h-screen bg-[var(--color-bgContrast)] text-[var(--color-textBase)] transition-colors duration-500">
      
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={volverAlPanel}
          className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded shadow"
        >
          Volver al Panel
        </button>
        <button
          onClick={() => setMostrarModal(true)}
          className="bg-pink-600 text-white px-5 py-2 rounded shadow hover:bg-pink-700 flex items-center gap-2 text-sm font-semibold"
        >
          <FaHeart size={18} />
          Ver Favoritos ({favoritos.length})
        </button>
      </div>

      {/* Título y descripción animados */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold text-pink-500 mb-2">Galería Científica NASA</h1>
        <p className="text-gray-300">
          Explorá las maravillas del espacio a través de la biblioteca de imágenes de la NASA.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row items-start gap-8 mt-6">
        <div className="flex flex-col items-center md:w-1/4">
          <motion.img
            src="/nasa.png"
            alt="Logo NASA"
            className="w-40 h-40 mb-6 rounded-full border-4 border-pink-600 shadow-lg"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.1 }}
          />
          <input
            type="text"
            placeholder="Buscar imágenes..."
            className="px-4 py-2 bg-pink-100 border border-pink-400 rounded-md w-full mb-4 text-black shadow"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={buscarImagenes}
            className="bg-pink-600 text-white px-4 py-2 rounded-md w-full hover:bg-pink-700 mb-6 font-semibold"
          >
            <FaSearch className="inline mr-2" />
            Buscar
          </button>
          <label className="text-pink-500 mb-2 font-semibold">¿Cuántas imágenes querés ver?</label>
          <input
            type="number"
            min="1"
            max="100"
            value={limite}
            onChange={(e) => setLimite(Number(e.target.value))}
            className="w-24 p-2 bg-pink-100 border border-pink-400 rounded-md text-black mb-4 shadow"
          />
        </div>

        <div className="flex-1 h-[70vh] overflow-y-auto pr-4">
          {cargando ? (
            <div className="flex justify-center items-center h-full">
              <motion.div
                className="w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
              />
            </div>
          ) : (
            <ListaNasa
              resultados={resultados.slice(0, limite)}
              favoritos={favoritos}
              toggleFavorito={toggleFavorito}
            />
          )}
        </div>
      </div>

      {mostrarModal && (
        <ModalFavoritosNasa
          favoritos={favoritos}
          onClose={() => setMostrarModal(false)}
          toggleFavorito={toggleFavorito}
        />
      )}
    </div>
  )
}

export default NasaView
