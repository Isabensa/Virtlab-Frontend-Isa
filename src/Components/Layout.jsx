import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black dark:bg-[#121212] dark:text-white font-serif transition-colors duration-500">
      <Header />
      
      {/* Contenido principal */}
      <main className="flex-grow px-4 py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout
