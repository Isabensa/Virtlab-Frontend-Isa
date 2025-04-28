import { useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaTrash, FaEdit, FaUserPlus } from 'react-icons/fa'
import Swal from 'sweetalert2'

const TablaClases = ({ clases }) => {
  const navigate = useNavigate()
  const rol = localStorage.getItem('rol')

  const eliminarAula = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar aula?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/api/clases/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const data = await res.json()
        if (res.ok) {
          Swal.fire('¡Eliminada!', data.mensaje, 'success')
          window.location.reload()
        } else {
          Swal.fire('Error', data.mensaje || 'No se pudo eliminar.', 'error')
        }
      } catch (error) {
        console.error('Error al eliminar aula:', error)
        Swal.fire('Error', 'Error de red.', 'error')
      }
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse mb-6">
        <thead className="bg-[#e26868] text-white">
          <tr className="h-12">
            <th className="px-4 py-2 border">Aula</th>
            <th className="px-4 py-2 border">Nivel</th>
            <th className="px-4 py-2 border">Curso</th>
            <th className="px-4 py-2 border">Docente</th>
            <th className="px-4 py-2 border">Alumnos</th>
            <th className="px-4 py-2 border">Fecha</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(clases) && clases.length > 0 ? (
            clases.map((aula) => (
              <tr key={aula._id} className="hover:bg-[#3e2e2e] text-white h-14">
                <td className="px-4 py-2 border">{aula.nombre}</td>
                <td className="px-4 py-2 border">{aula.nivel}</td>
                <td className="px-4 py-2 border">{aula.descripcion}</td>
                <td className="px-4 py-2 border">{aula.docente?.nombre || 'Sin asignar'}</td>
                <td className="px-4 py-2 border text-center">{aula.alumnos?.length || 0}</td>
                <td className="px-4 py-2 border text-center">
                  {new Date(aula.fechaCreacion).toLocaleDateString('es-AR')}
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {/* Ver: siempre visible */}
                    <button
                      title="Ver"
                      onClick={() => navigate(`/admin/clases/${aula._id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded text-xs"
                    >
                      <FaSignInAlt />
                    </button>

                    {/* Solo para roles distintos de alumno */}
                    {rol !== 'alumno' && (
                      <>
                        <button
                          title="Asignar alumnos"
                          onClick={() => navigate(`/admin/clases/asignar/${aula._id}`)}
                          className="bg-pink-600 hover:bg-pink-700 text-white p-1 rounded text-xs"
                        >
                          <FaUserPlus />
                        </button>

                        <button
                          title="Editar"
                          onClick={() => navigate(`/admin/clases/editar/${aula._id}`)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-black p-1 rounded text-xs"
                        >
                          <FaEdit />
                        </button>

                        {rol === 'admin' && (
                          <button
                            title="Eliminar"
                            onClick={() => eliminarAula(aula._id)}
                            className="bg-red-600 hover:bg-red-700 text-white p-1 rounded text-xs"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-6 text-white">
                No hay clases disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TablaClases
