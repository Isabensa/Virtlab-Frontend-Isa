import { Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout'
import LoginForm from './Components/LoginForm'
import ProtectedRoute from './Components/ProtectedRoute'
import DashboardAdmin from './Pages/DashboardAdmin'
import DashboardDocente from './Pages/DashboardDocente'
import DashboardAlumno from './Pages/DashboardAlumno'
import DashboardVisitante from './Pages/DashboardVisitante'
import UsuariosAdmin from './Pages/UsuariosAdmin'
import CrearUsuarioAdmin from './Pages/CrearUsuarioAdmin'
import EditarUsuarioAdmin from './Pages/EditarUsuarioAdmin'
import VerUsuarioAdmin from './Pages/VerUsuarioAdmin'
import ClasesAdmin from './Pages/ClasesAdmin'
import CrearClase from './Pages/CrearClase'
import EditarClase from './Pages/EditarClase'
import DetalleClase from './Pages/DetalleClase'
import AsignarAlumnos from './Pages/AsignarAlumnos'
import ReportesAdmin from './Pages/ReportesAdmin'
import NasaView from './Pages/NasaView'
import SelectorPerfiles from './Pages/SelectorPerfiles'
import ClasesDocente from './Pages/ClasesDocente'
import ClasesAlumno from './Pages/ClasesAlumno'
import Error404 from './Pages/Error404' 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LoginForm />} />
        <Route path="selector" element={<SelectorPerfiles />} />

        {/* Protege todo lo que necesita login */}
        <Route element={<ProtectedRoute />}>
          {/* Admin */}
          <Route path="admin" element={<DashboardAdmin />} />
          <Route path="admin/usuarios" element={<UsuariosAdmin />} />
          <Route path="admin/usuarios/crear" element={<CrearUsuarioAdmin />} />
          <Route path="admin/usuarios/:id" element={<VerUsuarioAdmin />} />
          <Route path="admin/usuarios/editar/:id" element={<EditarUsuarioAdmin />} />
          <Route path="admin/clases" element={<ClasesAdmin />} />
          <Route path="admin/clases/nueva" element={<CrearClase />} />
          <Route path="admin/clases/asignar/:id" element={<AsignarAlumnos />} />
          <Route path="admin/clases/:id" element={<DetalleClase />} />
          <Route path="admin/clases/editar/:id" element={<EditarClase />} />
          <Route path="admin/reportes" element={<ReportesAdmin />} />

          {/* Docente */}
          <Route path="docente" element={<DashboardDocente />} />
          <Route path="docente/clases" element={<ClasesDocente />} />

          {/* Alumno */}
          <Route path="alumno" element={<DashboardAlumno />} />
          <Route path="alumno/clases" element={<ClasesAlumno />} />

          {/* Visitante */}
          <Route path="visitante" element={<DashboardVisitante />} />

          {/* NASA para todos */}
          <Route path="nasa" element={<NasaView />} />
        </Route>

        {/* ✅ Página de error para rutas no existentes */}
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  )
}

export default App
