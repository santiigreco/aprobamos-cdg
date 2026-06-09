# 📚 Aprobamos CDG (Control de Gestión)

¡Bienvenido a **Aprobamos CDG**! Esta es una aplicación web interactiva diseñada específicamente para estudiantes de la materia **Control de Gestión (UTN)**. Su objetivo es facilitar el estudio, repaso y seguimiento del progreso de cara a los exámenes parciales a través de un entorno dinámico y gamificado.

## ✨ Características Principales

La aplicación cuenta con varias secciones clave diseñadas para maximizar tu aprendizaje:

- **📊 Dashboard**: Un panel de control principal intuitivo para navegar rápidamente entre todas las herramientas de estudio.
- **📝 Práctica Interactiva**: Una sección de cuestionarios (múltiple choice y verdadero/falso) basados en el material teórico para evaluar tus conocimientos.
- **📚 Apuntes y Resúmenes**: Acceso directo para visualizar online o descargar en PDF el material teórico fundamental de la materia (Teoría, Resumen del 1er Parcial, etc.).
- **🏆 Leaderboard**: Tabla de clasificación para motivarte a mantener rachas de estudio y superarte continuamente.

## 🛠️ Tecnologías Utilizadas

Este proyecto fue construido utilizando un stack web moderno y rápido:

- **React 19**
- **Vite**
- **CSS (Vanilla)**: Diseño personalizado con glassmorphism, variables modernas, y animaciones sutiles (`animate-fade-in`, `hover` effects).
- **Lucide React**: Para iconos hermosos y consistentes.
- **Canvas Confetti**: Efectos de celebración al completar cuestionarios con éxito.

## 🚀 Instalación y Uso Local

Para correr el proyecto en tu máquina local, sigue estos pasos:

1. **Navegar a la carpeta de la aplicación**:
   Asegúrate de estar dentro de la carpeta `cdg-app` (donde reside el proyecto frontend):
   ```bash
   cd cdg-app
   ```

2. **Instalar las dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**:
   El servidor normalmente se iniciará en `http://localhost:5173`. ¡Abre ese enlace y comienza a estudiar!
 
## 📁 Estructura del Proyecto

- `cdg-app/src/components/`: Contiene todas las vistas principales (`Dashboard`, `Notes`, `Practice`, `Leaderboard`).
- `cdg-app/src/data/`: Almacena la base de datos de preguntas (`questions.json`) utilizadas en la sección de práctica.
- `cdg-app/public/apuntes/`: Carpeta pública donde se alojan los PDFs originales de la materia.
- `cdg-app/src/App.css` e `index.css`: Sistema central de estilos globales, tokens de colores (Dark Mode compatible) y utilidades.

## 👨‍💻 Autor

- **Santiago** - Creador y desarrollador.
- GitHub: [santiigreco](https://github.com/santiigreco)

---
*Hecho con ❤️ para aprobar Control de Gestión de una vez por todas.*
