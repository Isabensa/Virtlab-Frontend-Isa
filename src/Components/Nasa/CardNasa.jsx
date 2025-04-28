
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const CardNasa = ({ item, esFavorito, toggleFavorito }) => {
  const { title, date_created, description } = item.data[0]
  const image = item.links?.find(link => link.render === 'image')?.href

  return (
    <div className="bg-[var(--color-cardBg)] border-2 border-pink-400 rounded-lg shadow-lg p-3 flex flex-col h-[390px] max-w-[260px] w-full transition duration-300 hover:scale-105 text-[var(--color-textBase)]">
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-md mb-2"
        />
      ) : (
        <div className="w-full h-40 bg-gray-300 rounded-md mb-2 flex items-center justify-center text-gray-600">
          Imagen no disponible
        </div>
      )}

      <h2 className="text-md font-bold mb-1 truncate">{title}</h2>
      <p className="text-xs text-gray-500 mb-1">
        {new Date(date_created).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-400 flex-grow overflow-hidden">
        {description?.substring(0, 80)}...
      </p>

      <button
        onClick={() => toggleFavorito(item)}
        className="mt-1 text-xl text-pink-500 self-end hover:scale-110 transition-transform"
        title={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        {esFavorito ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  )
}

export default CardNasa
