import { useTheme } from '../Context/ThemeContext'

const ModoOscuroDebug = () => {
  const { modoOscuro, toggleModo } = useTheme()

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-black dark:bg-black dark:text-white transition-colors duration-500">
      <h1 className="text-3xl font-bold mb-4">Modo Oscuro Debug</h1>
      <p className="mb-6">
        Estado actual: {modoOscuro ? '🌙 Oscuro' : '☀️ Claro'}
      </p>
      <button
        onClick={toggleModo}
        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
      >
        Cambiar a {modoOscuro ? '☀️ Claro' : '🌙 Oscuro'}
      </button>
    </div>
  )
}

export default ModoOscuroDebug
