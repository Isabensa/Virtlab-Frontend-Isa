import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const manejarLogin = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const { data } = await axios.post('http://localhost:5000/api/usuarios/login', {
        email,
        password,
      })

      // Guardar token y datos del usuario
      localStorage.setItem('token', data.token)
      localStorage.setItem('idUsuario', data.usuario.id)
      localStorage.setItem('nombreUsuario', data.usuario.nombre)
      localStorage.setItem('rol', data.usuario.rol)

      // Redirigir según el rol
      switch (data.usuario.rol) {
        case 'admin':
          navigate('/admin')
          break
        case 'docente':
          navigate('/docente')
          break
        case 'alumno':
          navigate('/alumno')
          break
        case 'visitante':
          navigate('/visitante')
          break
        default:
          navigate('/')
      }
    } catch (error) {
      console.error('Error en login:', error)
      setError('Credenciales incorrectas')
    }
  }

  const irAlSelector = () => {
    navigate('/selector')
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center font-serif">
      <div className="bg-[#2b1e1e] border border-pink-500 p-8 rounded shadow-lg w-96 text-center space-y-6">

        {/* Imagen con acceso al selector */}
        <img
          src="/userlogin.png"
          alt="Acceso a selector de perfiles"
          onClick={irAlSelector}
          className="w-20 h-20 rounded-full mx-auto border-4 border-pink-300 shadow cursor-pointer hover:opacity-80"
        />

        <h2 className="text-2xl font-bold text-white">Iniciar Sesión</h2>

        <form onSubmit={manejarLogin} className="space-y-4">
          <div className="text-left">
            <label className="block mb-1 text-sm">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-[#3a2f30] text-white border border-pink-300"
              placeholder="ejemplo@email.com"
              required
            />
          </div>

          <div className="text-left">
            <label className="block mb-1 text-sm">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-[#3a2f30] text-white border border-pink-300"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded"
          >
            Ingresar
          </button>
        </form>

        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    </div>
  )
}

export default LoginForm
