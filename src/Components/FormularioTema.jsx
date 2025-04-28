import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

const FormularioTema = ({ aulaId, tema, onTemaAgregado }) => {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (tema) {
      setTitulo(tema.titulo || '')
      setDescripcion(tema.descripcion || '')
      setUrl(tema.url || '')
    } else {
      setTitulo('')
      setDescripcion('')
      setUrl('')
    }
  }, [tema])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!titulo || !descripcion || !url) {
      Swal.fire('Error', 'Todos los campos son obligatorios.', 'warning')
      return
    }

    const payload = { titulo, descripcion, url }

    try {
      const res = await fetch(
        tema
          ? `http://localhost:5000/api/temas/${tema._id}` // edición
          : `http://localhost:5000/api/temas/${aulaId}`,  // creación
        {
          method: tema ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      )

      const data = await res.json()

      if (res.ok) {
        Swal.fire(
          'Éxito',
          tema ? 'Simulación actualizada.' : 'Simulación creada.',
          'success'
        )
        onTemaAgregado()
      } else {
        Swal.fire('Error', data.mensaje || 'No se pudo guardar.', 'error')
      }
    } catch (error) {
      console.error(error)
      Swal.fire('Error', 'Error en el servidor.', 'error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#2b1e1e] p-6 border border-[#e26868] rounded mb-8"
    >
      <h3 className="text-xl font-bold mb-4 text-[#f2a6a6]">
        {tema ? 'Editar Simulación' : 'Nueva Simulación'}
      </h3>

      <input
        type="text"
        placeholder="Título de la simulación"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="w-full mb-3 p-2 bg-[#3a2f30] text-white border border-[#e26868] rounded"
        required
      />

      <textarea
        placeholder="Descripción del laboratorio"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="w-full mb-3 p-2 bg-[#3a2f30] text-white border border-[#e26868] rounded"
        rows={3}
        required
      />

      <input
        type="url"
        placeholder="URL del laboratorio virtual"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full mb-4 p-2 bg-[#3a2f30] text-white border border-[#e26868] rounded"
        required
      />

      <button
        type="submit"
        className="bg-[#e26868] hover:bg-[#d75151] text-white px-4 py-2 rounded"
      >
        {tema ? 'Actualizar Simulación' : 'Guardar Simulación'}
      </button>
    </form>
  )
}

export default FormularioTema
