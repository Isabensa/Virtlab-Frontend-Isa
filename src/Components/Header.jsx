import { FaSun, FaMoon, FaDesktop } from 'react-icons/fa'
import { useTheme } from '../Context/ThemeContext'

const Header = () => {
  const { theme, setTheme } = useTheme()

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white text-black dark:bg-black dark:text-white transition-colors duration-500 shadow">
      <h1 className="text-2xl font-bold">Virtlab NASA</h1>

      <div className="flex gap-2 items-center">
        <button onClick={() => setTheme('light')} title="Modo Claro">
          <FaSun />
        </button>
        <button onClick={() => setTheme('dark')} title="Modo Oscuro">
          <FaMoon />
        </button>
        <button onClick={() => setTheme('system')} title="Modo Sistema">
          <FaDesktop />
        </button>
      </div>
    </header>
  )
}

export default Header
