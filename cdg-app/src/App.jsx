import React, { useState, useEffect } from 'react';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import Practice from './components/Practice';
import Notes from './components/Notes';
import Leaderboard from './components/Leaderboard';
import { User, Trophy, BookOpen, Brain, ArrowLeft } from 'lucide-react';

function App() {
  const [userName, setUserName] = useState('');
  const [score, setScore] = useState(0);
  const [currentView, setCurrentView] = useState('welcome'); // welcome, dashboard, practice, notes, leaderboard

  useEffect(() => {
    const savedName = localStorage.getItem('cdg_username');
    if (savedName) {
      setUserName(savedName);
      setCurrentView('dashboard');
    }
  }, []);

  const handleLogin = (name) => {
    setUserName(name);
    localStorage.setItem('cdg_username', name);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUserName('');
    setScore(0);
    localStorage.removeItem('cdg_username');
    setCurrentView('welcome');
  };

  const saveScore = (newScore) => {
    setScore(newScore);
    const leaderboard = JSON.parse(localStorage.getItem('cdg_leaderboard') || '[]');
    const existingEntryIndex = leaderboard.findIndex(entry => entry.name === userName);
    
    if (existingEntryIndex >= 0) {
      if (newScore > leaderboard[existingEntryIndex].score) {
        leaderboard[existingEntryIndex].score = newScore;
      }
    } else {
      leaderboard.push({ name: userName, score: newScore });
    }
    
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('cdg_leaderboard', JSON.stringify(leaderboard));
  };

  if (currentView === 'welcome') {
    return <Welcome onLogin={handleLogin} />;
  }

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
        <div className="flex align-center gap-4">
          <div className="user-score">
            <Trophy size={18} />
            <span>{score} pts</span>
          </div>
          <div className="user-score" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc' }}>
            <User size={18} />
            <span>{userName}</span>
          </div>
          <button className="btn btn-outline" onClick={handleLogout} style={{ padding: '0.5rem' }}>
            Salir
          </button>
        </div>
      </nav>

      {currentView === 'dashboard' && <Dashboard setView={setCurrentView} />}
      {currentView === 'practice' && <Practice score={score} onScoreUpdate={saveScore} />}
      {currentView === 'notes' && <Notes />}
      {currentView === 'leaderboard' && <Leaderboard currentUser={userName} />}
    </div>
  );
}

export default App;
