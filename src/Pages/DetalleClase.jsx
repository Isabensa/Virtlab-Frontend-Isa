import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import FormularioTema from '../Components/FormularioTema'

const DetalleClase = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [clase, setClase] = useState(null)
  const [temas, setTemas] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [temaEditando, setTemaEditando] = useState(null)

  useEffect(() => {
    const obtenerClase = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/clases/${id}`)
        const data = await res.json()
        setClase(data)
      } catch (error) {
        console.error('Error al obtener el aula:', error)
      }
    }

    obtenerClase()
  }, [id])

  const obtenerTemas = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/temas/${id}`)
      const data = await res.json()
      setTemas(data)
    } catch (error) {
      console.error('Error al obtener los temas:', error)
    }
  }

  useEffect(() => {
    if (id) obtenerTemas()
  }, [id])

  const registrarVisitaYRedirigir = async (temaId, url) => {
    try {
      await fetch(`http://localhost:5000/api/temas/${temaId}/visitar`, {
        method: 'PUT'
      })
      obtenerTemas() // ✅ actualizar visitas después de registrar
      window.open(url, '_blank', 'noopener,noreferrer')
    } catch (error) {
      console.error('No se pudo registrar la visita:', error)
    }
  }

  const eliminarTema = async (temaId) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar simulación?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/api/temas/${temaId}`, {
          method: 'DELETE'
        })

        const data = await res.json()
        if (res.ok) {
          Swal.fire('¡Eliminado!', data.mensaje, 'success')
          obtenerTemas()
        } else {
          Swal.fire('Error', data.mensaje || 'No se pudo eliminar.', 'error')
        }
      } catch (error) {
        console.error('Error al eliminar tema:', error)
        Swal.fire('Error', 'Error de red.', 'error')
      }
    }
  }

  const handleEditarTema = (tema) => {
    setTemaEditando(tema)
    setMostrarFormulario(true)
  }

  const handleGuardado = () => {
    setTemaEditando(null)
    setMostrarFormulario(false)
    obtenerTemas()
  }

  if (!clase) return <p className="text-white text-center">Cargando aula...</p>

  return (
    <div className="min-h-screen bg-[#2b1e1e] text-[#f2a6a6] p-8 font-serif">
      <div className="max-w-6xl mx-auto bg-[#3a2f30] p-6 rounded shadow">
        <h2 className="text-3xl font-bold mb-4 text-center">Detalle del Aula</h2>

        <ul className="space-y-2 mb-6">
          <li><strong>Nombre:</strong> {clase.nombre}</li>
          <li><strong>Nivel:</strong> {clase.nivel}</li>
          <li><strong>Curso / Descripción:</strong> {clase.descripcion}</li>
          <li><strong>Docente:</strong> {clase.docente?.nombre || 'Sin asignar'}</li>
          <li><strong>Fecha:</strong> {new Date(clase.fechaCreacion).toLocaleDateString('es-AR')}</li>
          <li><strong>Alumnos:</strong> {clase.alumnos?.length || 0}</li>
        </ul>

        <div className="text-center mb-6">
          <button
            onClick={() => {
              setTemaEditando(null)
              setMostrarFormulario(!mostrarFormulario)
            }}
            className="bg-[#e26868] hover:bg-[#d75151] text-white px-6 py-2 rounded"
          >
            {mostrarFormulario ? 'Ocultar Formulario' : 'Agregar Simulación'}
          </button>
        </div>

        {mostrarFormulario && (
          <FormularioTema
            aulaId={id}
            tema={temaEditando}
            onTemaAgregado={handleGuardado}
          />
        )}

        <div className="bg-[#2a1c1c] p-4 rounded shadow-sm mt-6">
          <h3 className="text-xl font-semibold mb-4 text-[#f2a6a6]">Simulaciones del Aula</h3>

          {temas.length > 0 ? (
            <table className="w-full table-auto border-collapse text-sm">
              <thead className="bg-[#e26868] text-white">
                <tr>
                  <th className="px-4 py-2 border">Título</th>
                  <th className="px-4 py-2 border">Descripción</th>
                  <th className="px-4 py-2 border">Visitas</th>
                  <th className="px-4 py-2 border">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {temas.map((tema) => (
                  <tr key={tema._id} className="hover:bg-[#3a2a2a] text-white">
                    <td className="px-4 py-2 border">{tema.titulo}</td>
                    <td className="px-4 py-2 border">{tema.descripcion}</td>
                    <td className="px-4 py-2 border text-center">{tema.visitas}</td>
                    <td className="px-4 py-2 border text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          title="Ver"
                          onClick={() => registrarVisitaYRedirigir(tema._id, tema.url)}
                          className="bg-blue-400 hover:bg-blue-500 text-white px-2 py-1 rounded text-xs"
                        >
                          Ver
                        </button>
                        <button
                          title="Editar"
                          onClick={() => handleEditarTema(tema)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 rounded text-xs"
                        >
                          ✏️
                        </button>
                        <button
                          title="Eliminar"
                          onClick={() => eliminarTema(tema._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-300 italic">No hay simulaciones aún.</p>
          )}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/admin/clases')}
            className="bg-[#444] hover:bg-[#666] text-white px-4 py-2 rounded"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetalleClase
