import CardNasa from './CardNasa'
import { FaTimes, FaArrowLeft } from 'react-icons/fa'

const ModalFavoritosNasa = ({ favoritos, onClose, toggleFavorito }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--color-bgContrast)] text-[var(--color-textBase)] w-full max-w-5xl rounded-lg shadow-lg p-6 overflow-auto max-h-[90vh] relative">

        <h2 className="text-2xl font-bold mb-4 text-center text-pink-500">❤️ Imágenes Favoritas</h2>

        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded flex items-center gap-2"
          >
            Volver
          </button>

          <button
            onClick={onClose}
            className="text-xl text-pink-500 hover:text-pink-700"
            title="Cerrar"
          >
            <FaTimes />
          </button>
        </div>

        {favoritos.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">No hay imágenes favoritas.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {favoritos.map((item, index) => {
              const id = item.data[0]?.nasa_id
              return (
                <div key={id || index} className="relative">
                  <CardNasa
                    item={item}
                    esFavorito={true}
                    toggleFavorito={toggleFavorito}
                  />
                  <button
                    onClick={() => toggleFavorito(item)}
                    className="mt-2 w-full bg-pink-600 hover:bg-pink-700 text-white text-sm py-1 rounded shadow text-center"
                  >
                    Quitar de Favoritos
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ModalFavoritosNasa
