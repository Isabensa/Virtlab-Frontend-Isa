import { useNavigate } from 'react-router-dom'

const AdminButton = ({ texto, ruta, className = "" }) => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(ruta)}
      className={`bg-[#f29b9b] hover:bg-[#e26868] text-white py-2 px-4 rounded shadow-md transition ${className}`}
    >
      {texto}
    </button>
  )
}

export default AdminButton
