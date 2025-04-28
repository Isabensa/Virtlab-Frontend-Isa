import { useNavigate } from 'react-router-dom'
import FormularioClase from '../Components/FormularioClase'

const CrearClase = () => {
  const navigate = useNavigate()

  const handleClaseCreada = () => {
    // Redirigir al listado de aulas al guardar
    navigate('/admin/clases')
  }

  return (
    <div className="min-h-screen bg-[#2b1e1e] text-[#f2a6a6] p-8 font-serif">
      <h2 className="text-3xl font-bold mb-6 text-center">Crear Nueva Aula</h2>

      <div className="max-w-4xl mx-auto">
        <FormularioClase onClaseCreada={handleClaseCreada} />
      </div>
    </div>
  )
}

export default CrearClase
