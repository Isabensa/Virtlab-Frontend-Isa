# 📄 Virtlab NASA Frontend

## 📙 Descripción
Frontend del proyecto **Virtlab NASA**, aplicación educativa que permite:
- Gestionar usuarios
- Crear y administrar aulas
- Crear y gestionar simulaciones científicas
- Explorar la galería de imágenes científicas de la NASA

---

## 🚀 Tecnologías utilizadas
- React 19
- Vite
- Tailwind CSS 4
- React Router DOM
- Axios
- Framer Motion
- SweetAlert2
- React Toastify

---

## 📁 Estructura del Proyecto
```plaintext
src/
 ├── Components/
 │   ├── Nasa/
 │   └── Layout/
 ├── Pages/
 │   └── DashboardAdmin.jsx, DashboardAlumno.jsx, etc.
 ├── Context/
 │   ├── AuthContext.jsx
 │   └── ThemeContext.jsx
 └── services/
     └── api.js
```

---

## ⚙️ Instrucciones para correr el proyecto localmente

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

### 4. Variables de entorno

No requiere .env obligatorio para el frontend.
Si deseas configurar una URL base de la API, puedes agregar:

```bash
VITE_API_URL=https://virtlab-backend-isa.onrender.com
```

*(Ya está configurado manualmente en `api.js`)*

### 5. Levantar el servidor de desarrollo
```bash
npm run dev
```

Accede en tu navegador a:
```plaintext
http://localhost:5173
```

---

## 🚧 Aplicación desplegada online

Puedes ver la versión publicada en Vercel aquí:

✨ https://virtlab-frontend-isa.vercel.app

> El frontend consume la API desplegada en https://virtlab-backend-isa.onrender.com

*(Recordá que Render puede demorar unos segundos en "despertar" el backend)*

---

## 📷 Capturas de Pantalla

### 📌 Pantalla de Login
![Pantalla de Login](./src/assets/1-readme.png)

### 📌 Dashboard del Administrador
![Dashboard del Administrador](./src/assets/2-readme.png)

### 📌 Gestión de Usuarios
![Gestión de Usuarios](./src/assets/3-readme.png)

---

## 📄 Licencia

Proyecto académico para fines educativos.

Desarrollado por **Celia Isabel Bensadón**.

Diplomatura en Desarrollo Web Fullstack 2025.

