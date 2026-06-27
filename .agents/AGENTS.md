# AGENTS.md — aprobamos-cdg

Guía para el agente de IA sobre la arquitectura y convenciones del proyecto.

---

## ¿Qué es este proyecto?

**aprobamos-cdg** es una plataforma de estudio interactiva para materias de la UTN.
Fue creada originalmente para **Control de Gestión (CDG)** y evolucionó a ser multi-materia.

Stack: **React + Vite**, sin backend propio. Los puntajes del Leaderboard se persisten en Google Sheets via Google Apps Script.

El build genera archivos estáticos (`dist/`) que se despliegan en cualquier hosting estático (actualmente via GitHub Pages o hosting manual).

---

## Estructura del proyecto

```
aprobamos-cdg/
├── .agents/
│   └── AGENTS.md          ← este archivo
├── cdg-app/               ← el código fuente de la app
│   ├── public/
│   │   ├── apuntes/       ← PDFs de todas las materias (servidos estáticamente)
│   │   └── comercio-exterior.html  ← guía HTML standalone (legacy CDG)
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx        ← raíz: maneja `currentView` y `currentSubject`
│   │   ├── index.css      ← sistema de diseño global (tokens CSS, glassmorphism)
│   │   ├── App.css
│   │   ├── components/
│   │   │   ├── SubjectSelector.jsx  ← selector de materia (pantalla inicial)
│   │   │   ├── Dashboard.jsx        ← hub de navegación por sección
│   │   │   ├── Practice.jsx         ← quiz con tarjetas, timer, confetti
│   │   │   ├── Notes.jsx            ← apuntes: teoría, recetarios, PDFs
│   │   │   ├── Leaderboard.jsx      ← ranking global via Google Sheets
│   │   │   ├── ComercioExterior.jsx ← iframe a guía HTML legacy (CDG only)
│   │   │   └── Welcome.jsx          ← pantalla de bienvenida (login de nombre)
│   │   └── data/
│   │       ├── subjects.js          ← CONFIG CENTRAL de materias
│   │       └── cdg/
│   │           ├── questions.json   ← preguntas de CDG
│   │           └── notes.json       ← teoría y recetarios de CDG
│   ├── package.json
│   └── vite.config.js
└── [PDFs de CDG en la raíz del repo — ignorar, son archivos raw]
```

---

## Flujo de navegación

```
SubjectSelector (si hay >1 materia)
    ↓ elige materia
Dashboard (cards: Apuntes, Práctica, Leaderboard, + guía opcional)
    ↓
Practice | Notes | Leaderboard | [GuideComponent]
```

Estado manejado en `App.jsx`:
- `currentView`: `'subject-select' | 'dashboard' | 'practice' | 'notes' | 'leaderboard' | string`
- `currentSubject`: objeto de config de la materia activa (de `subjects.js`)

---

## Cómo agregar una materia nueva

1. **Crear carpeta de datos**: `src/data/<id-materia>/`
2. **Crear `questions.json`**: array de objetos con estructura:
   ```json
   {
     "id": 1,
     "type": "multiple_choice",
     "question": "...",
     "options": ["A", "B", "C", "D"],
     "correctAnswer": 0,
     "explanation": "..."
   }
   ```
3. **Crear `notes.json`**: estructura:
   ```json
   {
     "theory": [
       { "title": "Concepto", "color": "#60a5fa", "content": "..." }
     ],
     "recipes": [
       {
         "title": "Nombre Receta",
         "color": "#3b82f6",
         "steps": [
           { "title": "Paso 1", "content": "...", "isTip": false }
         ]
       }
     ],
     "pdfs": [
       { "name": "archivo.pdf", "title": "Título", "description": "..." }
     ]
   }
   ```
4. **Registrar en `src/data/subjects.js`**: agregar un objeto al array `SUBJECTS`.
5. **Copiar PDFs** a `public/apuntes/<id-materia>/` (o a `public/apuntes/` si se comparten).

---

## Diseño (index.css)

El sistema de diseño usa CSS custom properties (tokens):
- `--bg-color`, `--surface-color`, `--surface-border`
- `--primary-color` (#3b82f6), `--accent-color` (#8b5cf6)
- `--text-primary`, `--text-secondary`
- `--success` (#10b981), `--danger` (#ef4444)

Clases reutilizables clave: `.glass-panel`, `.btn`, `.btn-accent`, `.btn-outline`, `.animate-fade-in`, `.pdf-grid`, `.pdf-card`

**No usar Tailwind**. Usar las clases CSS del sistema o inline styles.

---

## Leaderboard / Google Sheets

- El `SCRIPT_URL` de Google Apps Script está hardcodeado en `Practice.jsx` y `Leaderboard.jsx`.
- **Si se quiere un leaderboard por materia**, habría que crear un Apps Script por materia o modificar el script para aceptar un parámetro `subject`.
- Por ahora el leaderboard es global (todos comparten la misma hoja).

---

## Comandos útiles

```bash
# Desde cdg-app/
npm run dev      # dev server local
npm run build    # build de producción → dist/
npm run preview  # preview del build
```

---

## Convenciones

- Componentes en PascalCase, archivos `.jsx`
- Datos de materia en `src/data/<id>/`
- IDs de materia: lowercase con guiones (`control-gestion`, `mantenimiento`)
- No hardcodear contenido específico de materia en componentes → todo va en `subjects.js` o en los JSONs
- Mantener `vite.config.js` con `base: './'` para que el build funcione en subdirectorios
