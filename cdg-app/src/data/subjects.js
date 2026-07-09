/**
 * subjects.js — Configuración central de materias
 *
 * Para agregar una materia nueva:
 * 1. Crear carpeta src/data/<id>/
 * 2. Agregar questions.json y notes.json en esa carpeta
 * 3. Copiar PDFs a public/apuntes/ (o public/apuntes/<id>/)
 * 4. Agregar un objeto a este array con la estructura de abajo
 */

export const SUBJECTS = [
  {
    id: 'control-gestion',
    name: 'Control de Gestión',
    shortName: 'CDG',
    description: 'Guía del 1er Parcial — Presupuestos, Ajuste por Inflación, Leasing y más.',
    color: '#3b82f6',
    accentColor: '#8b5cf6',
    icon: 'BookOpen',
    directView: 'html-guide',
    htmlFile: './guia-cdg.html',
    getQuestions: null,
    getNotes: null,
    guideView: null,
  },

  {
    id: 'comercio-exterior',
    name: 'Comercio Exterior',
    shortName: 'CE',
    description: 'Guía del 1er Parcial — INCOTERMS, territorio aduanero, logística y más.',
    color: '#10b981',
    accentColor: '#06b6d4',
    icon: 'Globe',
    // Esta materia no tiene quiz ni apuntes propios: va directo a la guía HTML
    directView: 'comercio-exterior',
    getQuestions: null,
    getNotes: null,
    guideView: null,
  },

  {
    id: 'mantenimiento',
    name: 'Mantenimiento Industrial',
    shortName: 'Mant.',
    description: 'Guía del 1er Parcial — Mantenimiento',
    color: '#f59e0b',
    accentColor: '#ef4444',
    icon: 'Wrench',
    directView: 'html-guide',
    htmlFile: './mantenimiento.html',
    getQuestions: null,
    getNotes: null,
    guideView: null,
  },

  {
    id: 'manejo-materiales',
    name: 'Manejo de Materiales',
    shortName: 'Man. Mat.',
    description: 'Guía del 1er Parcial — Manejo de Materiales',
    color: '#8b5cf6',
    accentColor: '#d946ef',
    icon: 'Package',
    directView: 'html-guide',
    htmlFile: './manejo-materiales.html',
    getQuestions: null,
    getNotes: null,
    guideView: null,
  },
];

/**
 * Devuelve una materia por su ID.
 * @param {string} id
 * @returns {object|undefined}
 */
export function getSubjectById(id) {
  return SUBJECTS.find(s => s.id === id);
}
