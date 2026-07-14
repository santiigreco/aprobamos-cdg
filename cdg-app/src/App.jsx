import React, { useState } from 'react';
import { SUBJECTS } from './data/subjects.js';
import Dashboard from './components/Dashboard';
import SubjectHub from './components/SubjectHub';
import HtmlGuide from './components/HtmlGuide';
import { ArrowLeft } from 'lucide-react';

function App() {
  const [currentSubject, setCurrentSubject] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' | 'subject-hub' | 'html-guide'
  const [currentHtmlFile, setCurrentHtmlFile] = useState(null);

  const handleSelectSubject = (subject) => {
    setCurrentSubject(subject);
    setCurrentView('subject-hub');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setCurrentSubject(null);
    setCurrentHtmlFile(null);
  };

  const handleSelectHtmlFile = (file) => {
    setCurrentHtmlFile(file);
    setCurrentView('html-guide');
  };

  const handleBackToHub = () => {
    setCurrentView('subject-hub');
    setCurrentHtmlFile(null);
  };

  const isDashboard = currentView === 'dashboard';
  const isSubjectHub = currentView === 'subject-hub';
  const isHtmlGuide = currentView === 'html-guide';

  return (
    <div className="app-container">
      {/* ── NAVBAR (oculto en vistas directas que usan pantalla completa) ── */}
      {!isHtmlGuide && (
        <nav className="navbar animate-fade-in">
          <div className="flex align-center gap-4">
            {isSubjectHub && (
              <button className="btn btn-outline" onClick={handleBackToDashboard}>
                <ArrowLeft size={18} /> Materias
              </button>
            )}
            <h2 className="title" style={{ fontSize: '1.5rem', marginBottom: 0 }}>
              {currentSubject ? (
                <>{currentSubject.shortName} — Aprobamos <span className="emoji">🎯</span></>
              ) : (
                <>Aprobamos <span className="emoji">🎯</span></>
              )}
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
            <SubjectHub 
              subject={currentSubject} 
              setHtmlFile={handleSelectHtmlFile} 
            />
          )}

          {isHtmlGuide && currentHtmlFile && (
            <HtmlGuide 
              htmlFile={currentHtmlFile} 
              onBack={handleBackToHub} 
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
