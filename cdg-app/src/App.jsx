import React, { useCallback, useEffect, useState } from 'react';
import { SUBJECTS, getSubjectById } from './data/subjects.js';
import Dashboard from './components/Dashboard';
import SubjectHub from './components/SubjectHub';
import HtmlGuide from './components/HtmlGuide';
import { ArrowLeft } from 'lucide-react';

function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  if (!raw) {
    return { view: 'dashboard', subject: null, guideIndex: null };
  }
  const [subjectId, guideIdxStr] = raw.split('/');
  const subject = getSubjectById(subjectId);
  if (!subject) {
    return { view: 'dashboard', subject: null, guideIndex: null };
  }
  if (guideIdxStr !== undefined && guideIdxStr !== '') {
    const idx = Number(guideIdxStr);
    const guide = subject.guides?.[idx];
    if (Number.isInteger(idx) && guide?.htmlFile) {
      return { view: 'html-guide', subject, guideIndex: idx };
    }
  }
  return { view: 'subject-hub', subject, guideIndex: null };
}

function App() {
  const [route, setRoute] = useState(parseHash);

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((nextHash) => {
    const target = nextHash.startsWith('#') ? nextHash : `#${nextHash}`;
    if (window.location.hash !== target) {
      window.location.hash = target;
    } else {
      setRoute(parseHash());
    }
  }, []);

  const handleSelectSubject = (subject) => {
    navigate(`/${subject.id}`);
  };

  const handleSelectGuide = (subject, guideIndex) => {
    const guide = subject.guides?.[guideIndex];
    if (guide?.htmlFile) {
      navigate(`/${subject.id}/${guideIndex}`);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  const handleBackToHub = () => {
    if (route.subject) {
      navigate(`/${route.subject.id}`);
    } else {
      navigate('/');
    }
  };

  const isDashboard = route.view === 'dashboard';
  const isSubjectHub = route.view === 'subject-hub';
  const isHtmlGuide = route.view === 'html-guide';
  const currentHtmlFile =
    isHtmlGuide && route.subject && route.guideIndex !== null
      ? route.subject.guides?.[route.guideIndex]?.htmlFile
      : null;

  return (
    <div className="app-shell">
      {isSubjectHub && route.subject && (
        <nav className="topbar animate-fade-in">
          <div className="topbar-left">
            <button type="button" className="btn-back" onClick={handleBackToDashboard}>
              <ArrowLeft size={16} /> Materias
            </button>
            <div className="breadcrumb">
              <span className="breadcrumb-brand" onClick={handleBackToDashboard}>
                aprobamos.utn
              </span>
              <span>/</span>
              <span className="breadcrumb-current">{route.subject.name}</span>
            </div>
          </div>
        </nav>
      )}

      {isDashboard && (
        <Dashboard
          subjects={SUBJECTS}
          onSelect={handleSelectSubject}
          onSelectGuide={handleSelectGuide}
        />
      )}

      {route.subject && isSubjectHub && (
        <SubjectHub
          subject={route.subject}
          onSelectGuide={(guideIndex) => handleSelectGuide(route.subject, guideIndex)}
        />
      )}

      {isHtmlGuide && currentHtmlFile && (
        <HtmlGuide htmlFile={currentHtmlFile} onBack={handleBackToHub} />
      )}

      {!isHtmlGuide && (
        <footer className="app-footer">
          <span>aprobamos.utn · guías interactivas de estudio</span>
          <span>#/{route.subject ? route.subject.id : 'catalogo'}</span>
        </footer>
      )}
    </div>
  );
}

export default App;
