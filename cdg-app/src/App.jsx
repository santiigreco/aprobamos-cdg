import React, { useState } from 'react';
import { SUBJECTS } from './data/subjects.js';
import Dashboard from './components/Dashboard';
import SubjectHub from './components/SubjectHub';
import Practice from './components/Practice';
import Notes from './components/Notes';
import ComercioExterior from './components/ComercioExterior';
import HtmlGuide from './components/HtmlGuide';
import { ArrowLeft } from 'lucide-react';

// Mapa de componentes de vista directa (materias sin hub propio)
const DIRECT_VIEW_COMPONENTS = {
  'comercio-exterior': ComercioExterior,
  'html-guide': HtmlGuide,
};

function App() {
  const [currentSubject, setCurrentSubject] = useState(null);
  // 'dashboard' | 'subject-hub' | 'practice' | 'notes' | 'comercio-exterior'
  const [currentView, setCurrentView] = useState('dashboard');

  const handleSelectSubject = (subject) => {
    setCurrentSubject(subject);
    setCurrentView(subject.directView || 'subject-hub');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setCurrentSubject(null);
  };

  const isDashboard = currentView === 'dashboard';
  const isSubjectHub = currentView === 'subject-hub';
  const isDirectView = currentSubject?.directView && currentView === currentSubject.directView;
  const DirectViewComponent = isDirectView ? DIRECT_VIEW_COMPONENTS[currentView] : null;

  // Las vistas que necesitan el botón "Volver" a subject-hub
  const showBackToHub = !isDashboard && !isSubjectHub && !isDirectView;
  // Las vistas que necesitan el botón "Materias" (vuelve al dashboard principal)
  const showBackToMateria = isSubjectHub;

  return (
    <div className="app-container">
      {/* ── NAVBAR (oculto en vistas directas que usan pantalla completa) ── */}
      {!isDirectView && (
        <nav className="navbar animate-fade-in">
          <div className="flex align-center gap-4">
            {showBackToHub && (
              <button className="btn btn-outline" onClick={() => setCurrentView('subject-hub')}>
                <ArrowLeft size={18} /> Volver
              </button>
            )}
            {showBackToMateria && (
              <button className="btn btn-outline" onClick={handleBackToDashboard}>
                <ArrowLeft size={18} /> Materias
              </button>
            )}
            <h2 className="title" style={{ fontSize: '1.5rem', marginBottom: 0 }}>
              {currentSubject ? `${currentSubject.shortName} — Aprobamos 🎯` : 'Aprobamos 🎯'}
            </h2>
          </div>
        </nav>
      )}

      {/* ── VISTAS ── */}

      {isDashboard && (
        <Dashboard subjects={SUBJECTS} onSelect={handleSelectSubject} />
      )}

      {currentSubject && (
        <>
          {isSubjectHub && (
            <SubjectHub subject={currentSubject} setView={setCurrentView} />
          )}
          {currentView === 'practice' && (
            <Practice subject={currentSubject} onExit={() => setCurrentView('subject-hub')} />
          )}
          {currentView === 'notes' && (
            <Notes subject={currentSubject} />
          )}

          {/* Vistas directas (ej. Comercio Exterior — pantalla completa) */}
          {isDirectView && DirectViewComponent && (
            <>
              {/* Botón flotante para volver al menú de materias */}
              <button
                onClick={handleBackToDashboard}
                style={{
                  position: 'fixed',
                  top: '1rem',
                  left: '1rem',
                  zIndex: 9999,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(10, 14, 26, 0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(99, 102, 241, 0.4)',
                  color: '#a5b4fc',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'Inter, sans-serif',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(99, 102, 241, 0.25)';
                  e.currentTarget.style.color = '#c7d2fe';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(10, 14, 26, 0.85)';
                  e.currentTarget.style.color = '#a5b4fc';
                }}
              >
                <ArrowLeft size={16} /> Volver a materias
              </button>
              <DirectViewComponent subject={currentSubject} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
