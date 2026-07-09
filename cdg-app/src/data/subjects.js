/**
 * subjects.js — Configuración central de materias
 *
 * Para agregar una materia nueva o una guía nueva:
 * 1. Agregar un objeto a este array con la estructura de abajo
 * 2. Agregar un objeto dentro de 'guides' con el título y el HTML a mostrar.
 */

export const SUBJECTS = [
  {
    id: 'control-gestion',
    name: 'Control de Gestión',
    shortName: 'CDG',
    description: 'Guías de estudio interactivo.',
    color: '#3b82f6',
    accentColor: '#8b5cf6',
    icon: 'BookOpen',
    guides: [
      {
        title: '1er Parcial',
        description: 'Presupuestos, Ajuste por Inflación, Leasing y más.',
        htmlFile: './guia-cdg.html'
      },
      {
        title: '2do Parcial',
        description: 'Próximamente se habilitará el contenido.',
        htmlFile: null
      }
    ]
  },

  {
    id: 'comercio-exterior',
    name: 'Comercio Exterior',
    shortName: 'CE',
    description: 'Guías de estudio interactivo.',
    color: '#10b981',
    accentColor: '#06b6d4',
    icon: 'Globe',
    guides: [
      {
        title: '1er Parcial',
        description: 'INCOTERMS, territorio aduanero, logística y más.',
        htmlFile: './comercio-exterior.html'
      },
      {
        title: '2do Parcial',
        description: 'Próximamente se habilitará el contenido.',
        htmlFile: null
      }
    ]
  },

  {
    id: 'mantenimiento',
    name: 'Mantenimiento',
    shortName: 'Mant.',
    description: 'Guías de estudio interactivo.',
    color: '#f59e0b',
    accentColor: '#ef4444',
    icon: 'Wrench',
    guides: [
      {
        title: '1er Parcial',
        description: 'Teoría general de Mantenimiento.',
        htmlFile: './mantenimiento.html'
      },
      {
        title: '2do Parcial',
        description: 'Próximamente se habilitará el contenido.',
        htmlFile: null
      }
    ]
  },

  {
    id: 'manejo-materiales',
    name: 'Manejo de Materiales y Distribución en Planta',
    shortName: 'Man. Mat.',
    description: 'Guías de estudio interactivo.',
    color: '#8b5cf6',
    accentColor: '#d946ef',
    icon: 'Package',
    guides: [
      {
        title: '1er Parcial',
        description: 'Manejo de Materiales y equipos.',
        htmlFile: './manejo-materiales.html'
      },
      {
        title: '2do Parcial',
        description: 'Próximamente se habilitará el contenido.',
        htmlFile: null
      }
    ]
  },

  {
    id: 'analisis-numerico',
    name: 'Análisis Numérico y Cálculo Avanzado',
    shortName: 'AN',
    description: 'Guías de estudio interactivo.',
    color: '#0ea5e9',
    accentColor: '#0284c7',
    icon: 'Brain',
    guides: [
      {
        title: 'Guía Final',
        description: 'Análisis Numérico',
        htmlFile: './guia-final-an.html'
      }
    ]
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
