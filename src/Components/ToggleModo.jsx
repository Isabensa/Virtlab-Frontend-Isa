import { useTheme } from '../Context/ThemeContext'
import { FaMoon, FaSun } from 'react-icons/fa'

const ToggleModo = () => {
  const { modoOscuro, toggleModo } = useTheme()

  return (
    <button
      onClick={toggleModo}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-yellow-600 dark:text-yellow-300 transition-all duration-300 shadow hover:scale-110"
      title="Cambiar modo claro/oscuro"
    >
      {modoOscuro ? <FaSun /> : <FaMoon />}
    </button>
  )
}

export default ToggleModo
