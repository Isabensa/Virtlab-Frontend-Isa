# 📚 Descripción del proyecto

Este repositorio contiene el frontend de la aplicación educativa **Virtlab NASA**.  
Es un sitio web que permite gestionar aulas, simulaciones científicas y navegar por una galería de imágenes espaciales provistas por la NASA.

---

# 🚀 Tecnologías utilizadas

- React 19
- Vite
- Tailwind CSS 4
- React Router DOM
- Axios
- Framer Motion
- SweetAlert2
- React Toastify

---

# 📁 Estructura de carpetas

```
src/
  Components/
    Nasa/
    Layout/
    ...
  Pages/
    DashboardAdmin.jsx
    DashboardAlumno.jsx
    ...
  Context/
    AuthContext.jsx
    ThemeContext.jsx
  services/
    api.js
```

---

# ⚙️ Instrucciones para correr el proyecto localmente

### 1. Clonar el repositorio
```bash
git clone https://github.com/Isabensa/Virtlab-Frontend-Isa.git
```

### 2. Entrar a la carpeta del proyecto
```bash
cd Virtlab-Frontend-Isa
```

### 3. Instalar las dependencias
```bash
npm install
```

### 4. Crear un archivo `.env` (opcional)
Este proyecto funciona directamente en local. Solo sería necesario si quieres configurar Axios:

```bash
VITE_API_URL=http://localhost:5000
```

(No obligatorio si en tu `services/api.js` ya está manualmente seteada la URL.)

---

### 5. Levantar el servidor de desarrollo
```bash
npm run dev
```

Accede a tu navegador en:

```
http://localhost:5173
```

---

# 🛠️ Requisitos previos

- Tener Node.js instalado (versión 18 o superior recomendada).
- Tener npm instalado.
- Tener corriendo el backend de la aplicación (**Virtlab-Backend-Isa**) en paralelo.

---

# 📷 Capturas de pantalla

![Pantalla de Login](https://github.com/Isabensa/Virtlab-Frontend-Isa/blob/main/src/assets/1%20readme.png?raw=true)

![Dashboard Administrador](https://github.com/Isabensa/Virtlab-Frontend-Isa/blob/main/src/assets/2%20readme.png?raw=true)

![Gestión de Usuarios](https://github.com/Isabensa/Virtlab-Frontend-Isa/blob/main/src/assets/3%20readme.png?raw=true)

---

# 📄 Licencia

Proyecto académico para fines educativos.  
Desarrollado en el marco de la **Diplomatura de Desarrollo Fullstack 2025**.

---