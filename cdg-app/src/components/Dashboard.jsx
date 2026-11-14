import React, { useMemo } from 'react';
import { Award, BookOpen, Brain, Globe, Wrench, FlaskConical, Cpu, BarChart3, Package, Zap } from 'lucide-react';
import AuthorBadge from './AuthorBadge';

const ICON_MAP = {
  BookOpen, Brain, Globe, Wrench, FlaskConical, Cpu, BarChart3, Package, Zap,
};

const CARD_PALETTE = [
  { border: 'rgba(59,130,246,0.35)',  bg: 'rgba(59,130,246,0.06)'  },
  { border: 'rgba(245,158,11,0.35)',  bg: 'rgba(245,158,11,0.06)'  },
  { border: 'rgba(139,92,246,0.35)',  bg: 'rgba(139,92,246,0.06)'  },
  { border: 'rgba(16,185,129,0.35)',  bg: 'rgba(16,185,129,0.06)'  },
  { border: 'rgba(239,68,68,0.35)',   bg: 'rgba(239,68,68,0.06)'   },
  { border: 'rgba(234,179,8,0.35)',   bg: 'rgba(234,179,8,0.06)'   },
];

/**
 * Agrega los autores que aportaron guías disponibles junto con sus materias.
 * @param {Array} subjects
 * @returns {Array<{ author: string, count: number, subjects: string[] }>}
 */
function summarizeAuthors(subjects) {
  const byAuthor = new Map();

  for (const subject of subjects) {
    for (const guide of subject.guides || []) {
      if (!guide.author || !guide.htmlFile) continue;
      const existing = byAuthor.get(guide.author) || {
        author: guide.author,
        count: 0,
        subjects: new Set(),
      };
      existing.count += 1;
      existing.subjects.add(subject.shortName);
      byAuthor.set(guide.author, existing);
    }
  }

  return Array.from(byAuthor.values())
    .map((entry) => ({
      author: entry.author,
      count: entry.count,
      subjects: Array.from(entry.subjects),
    }))
    .sort((a, b) => b.count - a.count || a.author.localeCompare(b.author));
}

export default function Dashboard({ subjects }) {
  const authors = useMemo(() => summarizeAuthors(subjects), [subjects]);

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-4">
        <h1 className="title" style={{ fontSize: '2.5rem' }}>¿Qué hacemos hoy?</h1>
        <p className="subtitle">Elegí una materia para comenzar tu sesión de estudio.</p>
      </div>

      <div className="pdf-grid" style={{ marginTop: '2.5rem' }}>
        {subjects.map((subject, index) => {
          const IconComponent = ICON_MAP[subject.icon] || BookOpen;
          const palette = CARD_PALETTE[index % CARD_PALETTE.length];

          return (
            <a
              key={subject.id}
              href={`#/${subject.id}`}
              className="glass-panel pdf-card"
              style={{
                borderColor: palette.border,
                background: palette.bg,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div
                style={{
                  background: `${subject.color}22`,
                  padding: '1rem',
                  borderRadius: '14px',
                  marginBottom: '0.5rem',
                }}
              >
                <IconComponent size={44} color={subject.color} />
              </div>

              <h2 style={{ fontSize: '1.4rem', margin: '0.25rem 0', color: 'var(--text-primary)' }}>
                {subject.name}
              </h2>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', textAlign: 'center' }}>
                {subject.description}
              </p>

              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.35rem 1rem',
                  borderRadius: '999px',
                  background: `${subject.color}33`,
                  color: subject.color,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}
              >
                {subject.shortName}
              </div>
            </a>
          );
        })}
      </div>

      {authors.length > 0 && (
        <section
          aria-label="Reconocimiento a los autores"
          className="glass-panel"
          style={{
            marginTop: '3rem',
            padding: '1.75rem 2rem',
            background: 'rgba(30, 41, 59, 0.45)',
            borderColor: 'rgba(148, 163, 184, 0.18)',
          }}
        >
          <div className="text-center" style={{ marginBottom: '1.5rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#fbbf24',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '0.4rem',
              }}
            >
              <Award size={16} />
              <span>Reconocimiento a los autores</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
              Gracias a quienes elaboraron y compartieron las guías y simulacros de Aprobamos UTN.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '1rem',
            }}
          >
            {authors.map((entry) => (
              <div
                key={entry.author}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '1rem 1.1rem',
                  borderRadius: '12px',
                  background: 'rgba(15, 23, 42, 0.55)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  textAlign: 'center',
                }}
              >
                <AuthorBadge
                  author={entry.author}
                  label={entry.author}
                  style={{ fontSize: '0.9rem', padding: '0.3rem 0.9rem' }}
                />
                <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600 }}>
                  {entry.count} {entry.count === 1 ? 'guía aportada' : 'guías aportadas'}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.4 }}>
                  {entry.subjects.join(' · ')}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
