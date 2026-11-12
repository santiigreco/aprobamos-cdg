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
    color: '#3b82f6',
    guides: [
      {
        title: '1er Parcial',
        description: 'Presupuestos, Ajuste por Inflación, Leasing y más.',
        htmlFile: './guia-cdg.html'
      },
      {
        title: '2do Parcial',
        description: 'Banco Maestro de Teoría (Unidades A a X, 285 preguntas con esquemas, gráficos y notas de corrección).',
        htmlFile: './control-gestion-2do-parcial.html'
      }
    ]
  },

  {
    id: 'comercio-exterior',
    name: 'Comercio Exterior',
    shortName: 'CE',
    color: '#10b981',
    guides: [
      {
        title: '1er Parcial',
        description: 'INCOTERMS, territorio aduanero, logística y más.',
        htmlFile: './comercio-exterior.html'
      },
      {
        title: '2do Parcial',
        description: 'Exportación, contratos, medios de pago, costos FOB y más.',
        htmlFile: './comercio-exterior-2do-parcial.html'
      }
    ]
  },

  {
    id: 'mantenimiento',
    name: 'Mantenimiento',
    shortName: 'Mant.',
    color: '#f59e0b',
    guides: [
      {
        title: '1er Parcial',
        description: 'Teoría general de Mantenimiento.',
        htmlFile: './mantenimiento.html'
      },
      {
        title: '2do Parcial',
        description: 'Predictivo, Servicios y Tercerización (U4, U5 y U6). Parciales reales 10/10, simulador y flashcards.',
        htmlFile: './mantenimiento-2do-parcial.html'
      },
      {
        title: 'Recuperatorio',
        description: 'Guía del Recuperatorio reconstruida del examen real 2026 (Temas 1 a 4).',
        htmlFile: './mantenimiento-recuperatorio.html'
      }
    ]
  },

  {
    id: 'manejo-materiales',
    name: 'Manejo de Materiales y Distribución en Planta',
    shortName: 'Man. Mat.',
    color: '#8b5cf6',
    guides: [
      {
        title: 'Guía Maestra',
        description: 'Guía de estudio exhaustiva de parciales ordenada por frecuencia.',
        htmlFile: './guia-maestra-manejo-materiales.html'
      },
      {
        title: '1er Parcial',
        description: 'Manejo de Materiales y equipos.',
        htmlFile: './manejo-materiales.html'
      },
      {
        title: '2do Parcial — Banco Consolidado',
        description: '356 preguntas de parciales y finales ordenadas por probabilidad (U3 a U12), con 28 diagramas SVG, modo examen y números clave.',
        htmlFile: './manejo-materiales-2do-parcial.html'
      },
      {
        title: '2do Parcial — Guía Maestra',
        description: 'Teoría de filminas, 207 preguntas y 60 diagramas técnicos oficiales (U3, U4, U5, U6, U7.5, U11 y U12).',
        htmlFile: './guia-2do-parcial-manmat.html#U4'
      }
    ]
  },

  {
    id: 'analisis-numerico',
    name: 'Análisis Numérico y Cálculo Avanzado',
    shortName: 'AN',
    color: '#0ea5e9',
    guides: [
      {
        title: 'Guía Final',
        description: 'Análisis Numérico',
        htmlFile: './guia-final-an.html'
      }
    ]
  },

  {
    id: 'procesos-industriales',
    name: 'Procesos Industriales',
    shortName: 'PI',
    color: '#ef4444',
    guides: [
      {
        title: '1er Parcial',
        description: 'Próximamente se habilitará el contenido.',
        htmlFile: null
      },
      {
        title: '2do Parcial',
        description: 'Mecanizado, tratamientos superficiales, utilajes y plásticos. Ejercicios y teoría ordenados por frecuencia.',
        htmlFile: './procesos-industriales-2do-parcial.html'
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
