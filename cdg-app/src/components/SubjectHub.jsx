import React from 'react';
import { BookOpen, Brain } from 'lucide-react';

export default function SubjectHub({ subject, setView }) {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-4">
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: `${subject.color}22`,
            border: `1px solid ${subject.color}44`,
            color: subject.color,
            padding: '0.35rem 1.1rem',
            borderRadius: '999px',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1rem',
            letterSpacing: '0.04em',
          }}
        >
          {subject.shortName}
        </div>
        <h1 className="title" style={{ fontSize: '2.5rem' }}>{subject.name}</h1>
        <p className="subtitle">¿Qué querés hacer hoy?</p>
      </div>

      <div className="pdf-grid" style={{ marginTop: '2.5rem', maxWidth: '700px', margin: '2.5rem auto 0' }}>
        {/* Apuntes */}
        <div className="glass-panel pdf-card" onClick={() => setView('notes')}>
          <div style={{ background: 'rgba(59,130,246,0.15)', padding: '1.1rem', borderRadius: '14px', marginBottom: '0.5rem' }}>
            <BookOpen size={44} color="#3b82f6" />
          </div>
          <h2 style={{ fontSize: '1.5rem', margin: '0.25rem 0' }}>Apuntes</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
            Teoría resumida, recetarios prácticos y PDFs de la materia.
          </p>
        </div>

        {/* Práctica */}
        <div className="glass-panel pdf-card" onClick={() => setView('practice')}>
          <div style={{ background: `${subject.accentColor || '#8b5cf6'}22`, padding: '1.1rem', borderRadius: '14px', marginBottom: '0.5rem' }}>
            <Brain size={44} color={subject.accentColor || '#8b5cf6'} />
          </div>
          <h2 style={{ fontSize: '1.5rem', margin: '0.25rem 0' }}>Práctica</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
            Quiz interactivo con preguntas tipo parcial para repasar.
          </p>
        </div>
      </div>
    </div>
  );
}

