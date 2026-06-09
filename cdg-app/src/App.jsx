import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Practice from './components/Practice';
import Notes from './components/Notes';
import Leaderboard from './components/Leaderboard';
import { ArrowLeft } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, practice, notes, leaderboard

  return (
    <div className="app-container">
      <nav className="navbar animate-fade-in">
        <div className="flex align-center gap-4">
          {currentView !== 'dashboard' && (
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
    </div>
  );
}

export default App;
