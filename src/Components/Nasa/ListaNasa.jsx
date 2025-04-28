
import CardNasa from './CardNasa'

const ListaNasa = ({ resultados, favoritos, toggleFavorito }) => {
  if (!resultados || resultados.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-400">
        No se encontraron imágenes.
      </p>
    )
  }

  return (
    <div className="px-4 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
        {resultados.map((item, index) => (
          <CardNasa
            key={index}
            item={item}
            esFavorito={favoritos.some(
              (fav) => fav.data[0].nasa_id === item.data[0].nasa_id
            )}
            toggleFavorito={toggleFavorito}
          />
        ))}
      </div>
    </div>
  )
}

export default ListaNasa
