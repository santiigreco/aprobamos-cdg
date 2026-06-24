import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Practice from './components/Practice';
import Notes from './components/Notes';
import Leaderboard from './components/Leaderboard';
import ComercioExterior from './components/ComercioExterior';
import { ArrowLeft } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, practice, notes, leaderboard, comercio-exterior

  return (
    <div className="app-container">
      <nav className="navbar animate-fade-in">
        <div className="flex align-center gap-4">
          {currentView !== 'dashboard' && currentView !== 'comercio-exterior' && (
            <button className="btn btn-outline" onClick={() => setCurrentView('dashboard')}>
              <ArrowLeft size={18} /> Volver
            </button>
          )}
          <h2 className="title" style={{ fontSize: '1.5rem', marginBottom: 0 }}>
            CDG Tracker
          </h2>
        </div>
      </nav>

      {currentView === 'dashboard' && <Dashboard setView={setCurrentView} />}
      {currentView === 'practice' && <Practice onExit={() => setCurrentView('dashboard')} />}
      {currentView === 'notes' && <Notes />}
      {currentView === 'leaderboard' && <Leaderboard />}
      {currentView === 'comercio-exterior' && (
        <>
          {/* Botón flotante para volver al dashboard */}
          <button
            onClick={() => setCurrentView('dashboard')}
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
            <ArrowLeft size={16} /> Volver al inicio
          </button>
          <ComercioExterior />
        </>
      )}
    </div>
  );
}

export default App;

