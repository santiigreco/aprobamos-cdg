import React from 'react';
import { BookOpen, Brain, Trophy } from 'lucide-react';

export default function Dashboard({ setView }) {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-4">
        <h1 className="title" style={{ fontSize: '2.5rem' }}>¿Qué hacemos hoy?</h1>
        <p className="subtitle">Selecciona una sección para continuar tu preparación.</p>
      </div>

      <div className="pdf-grid" style={{ marginTop: '3rem' }}>
        <div className="glass-panel pdf-card" onClick={() => setView('notes')}>
          <BookOpen size={48} color="#3b82f6" />
          <h2 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>Apuntes</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Lee los PDFs oficiales de la materia, resúmenes y teoría.</p>
        </div>

        <div className="glass-panel pdf-card" onClick={() => setView('practice')}>
          <Brain size={48} color="#8b5cf6" />
          <h2 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>Práctica</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Tarjetas interactivas para repasar conceptos y ganar puntos.</p>
        </div>

        <div className="glass-panel pdf-card" onClick={() => setView('leaderboard')}>
          <Trophy size={48} color="#f59e0b" />
          <h2 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>Leaderboard</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Mira tu clasificación y compite por el mejor puntaje.</p>
        </div>
      </div>
    </div>
  );
}
