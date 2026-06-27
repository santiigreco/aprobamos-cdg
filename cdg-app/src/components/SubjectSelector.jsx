import React from 'react';
import { BookOpen, Brain, Globe, Wrench, FlaskConical, Cpu, BarChart3 } from 'lucide-react';

// Mapa de íconos disponibles para materias
const ICON_MAP = {
  BookOpen,
  Brain,
  Globe,
  Wrench,
  FlaskConical,
  Cpu,
  BarChart3,
};

export default function SubjectSelector({ subjects, onSelect }) {
  const colors = [
    { border: 'rgba(59,130,246,0.35)', bg: 'rgba(59,130,246,0.06)' },
    { border: 'rgba(245,158,11,0.35)', bg: 'rgba(245,158,11,0.06)' },
    { border: 'rgba(139,92,246,0.35)', bg: 'rgba(139,92,246,0.06)' },
    { border: 'rgba(16,185,129,0.35)', bg: 'rgba(16,185,129,0.06)' },
    { border: 'rgba(239,68,68,0.35)', bg: 'rgba(239,68,68,0.06)' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-4">
        <h1 className="title" style={{ fontSize: '2.5rem' }}>¿Qué materia estudiamos?</h1>
        <p className="subtitle">Elegí una materia para comenzar tu sesión de estudio.</p>
      </div>

      <div className="pdf-grid" style={{ marginTop: '2.5rem', maxWidth: '900px', margin: '2.5rem auto 0' }}>
        {subjects.map((subject, index) => {
          const IconComponent = ICON_MAP[subject.icon] || BookOpen;
          const colorPair = colors[index % colors.length];

          return (
            <div
              key={subject.id}
              className="glass-panel pdf-card"
              onClick={() => onSelect(subject)}
              style={{
                borderColor: colorPair.border,
                background: colorPair.bg,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
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
                <IconComponent size={40} color={subject.color} />
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
                  padding: '0.4rem 1rem',
                  borderRadius: '999px',
                  background: `${subject.color}33`,
                  color: subject.color,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                }}
              >
                {subject.shortName}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
