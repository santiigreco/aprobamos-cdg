import React, { useEffect, useState } from 'react';
import { SUBJECTS, getGuideById, getSubjectById } from './data/subjects.js';
import Dashboard from './components/Dashboard';
import SubjectHub from './components/SubjectHub';
import HtmlGuide from './components/HtmlGuide';
import { ArrowLeft } from 'lucide-react';

/**
 * Parsea rutas hash del estilo `#/`, `#/<subjectId>` y `#/<subjectId>/<guideId>`.
 * @param {string} hash
 * @returns {{ subjectId: string|null, guideId: string|null }}
 */
function parseHashRoute(hash) {
  const raw = hash.replace(/^#\/?/, '').trim();
  if (!raw) return { subjectId: null, guideId: null };

  const [subjectId, guideId] = raw
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      try {
        return decodeURIComponent(segment);
      } catch {
        return segment;
      }
    });

  return {
    subjectId: subjectId || null,
    guideId: guideId || null,
  };
}

function App() {
  const [route, setRoute] = useState(() => parseHashRoute(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHashRoute(window.location.hash));
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const currentSubject = route.subjectId ? getSubjectById(route.subjectId) : null;
  const matchedGuide = currentSubject && route.guideId
    ? getGuideById(currentSubject, route.guideId)
    : null;
  const activeGuide = matchedGuide?.htmlFile ? matchedGuide : null;

  // Normaliza URLs inválidas o guías aún no disponibles sin ensuciar el historial.
  useEffect(() => {
    if (route.subjectId && !currentSubject) {
      window.location.replace('#/');
      return;
    }
    if (currentSubject && route.guideId && !activeGuide) {
      window.location.replace(`#/${currentSubject.id}`);
    }
  }, [route.subjectId, route.guideId, currentSubject, activeGuide]);

  useEffect(() => {
    if (activeGuide && currentSubject) {
      document.title = `${activeGuide.title} · ${currentSubject.shortName} — Aprobamos UTN`;
    } else if (currentSubject) {
      document.title = `${currentSubject.shortName} — Aprobamos UTN`;
    } else {
      document.title = 'Aprobamos UTN';
    }
  }, [currentSubject, activeGuide]);

  const navigateTo = (path) => {
    const targetHash = path.startsWith('#') ? path : `#${path}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
  };

  const isDashboard = !currentSubject;
  const isSubjectHub = Boolean(currentSubject && !activeGuide);
  const isHtmlGuide = Boolean(currentSubject && activeGuide);

  return (
    <div className="app-container">
      {/* ── NAVBAR (oculto en vistas directas que usan pantalla completa) ── */}
      {!isHtmlGuide && (
        <nav className="navbar animate-fade-in">
          <div className="flex align-center gap-4">
            {isSubjectHub && (
              <a
                href="#/"
                className="btn btn-outline"
                style={{ textDecoration: 'none' }}
              >
                <ArrowLeft size={18} /> Materias
              </a>
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
        <Dashboard subjects={SUBJECTS} />
      )}

      {currentSubject && (
        <>
          {isSubjectHub && (
            <SubjectHub subject={currentSubject} />
          )}

          {isHtmlGuide && (
            <HtmlGuide
              htmlFile={activeGuide.htmlFile}
              onBack={() => navigateTo(`/${currentSubject.id}`)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
