import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import FormularioClase from '../Components/FormularioClase'

const EditarClase = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [clase, setClase] = useState(null)

  useEffect(() => {
    const fetchClase = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/clases/${id}`)
        const data = await res.json()
        setClase(data)
      } catch (error) {
        console.error('Error al obtener clase:', error)
      }
    }

    fetchClase()
  }, [id])

  const handleClaseActualizada = () => {
    navigate('/admin/clases')
  }

  if (!clase) return <p className="text-white text-center">Cargando clase...</p>

  return (
    <div className="min-h-screen bg-[#2b1e1e] text-[#f2a6a6] p-8 font-serif">
      <h2 className="text-3xl font-bold mb-6 text-center">Editar Clase</h2>
      <div className="max-w-4xl mx-auto">
        <FormularioClase clase={clase} onClaseCreada={handleClaseActualizada} />
      </div>
    </div>
  )
}

export default EditarClase
