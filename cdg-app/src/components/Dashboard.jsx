import React, { useMemo, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';

function normalize(str = '') {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function Dashboard({ subjects, onSelect, onSelectGuide }) {
  const [query, setQuery] = useState('');
  const normalizedQuery = normalize(query.trim());

  const totalGuides = useMemo(
    () =>
      subjects.reduce(
        (acc, s) => acc + (s.guides ? s.guides.filter((g) => Boolean(g.htmlFile)).length : 0),
        0
      ),
    [subjects]
  );

  const filteredSubjects = useMemo(() => {
    if (!normalizedQuery) return subjects;
    return subjects.filter((subject) => {
      const subjectMatch = normalize(`${subject.name} ${subject.shortName}`).includes(normalizedQuery);
      const guideMatch = (subject.guides || []).some((g) =>
        normalize(`${g.title} ${g.description}`).includes(normalizedQuery)
      );
      return subjectMatch || guideMatch;
    });
  }, [subjects, normalizedQuery]);

  return (
    <div>
      <header className="landing-header">
        <div>
          <h1 className="landing-title">Aprobamos UTN</h1>
          <p className="landing-subtitle">
            {subjects.length} materias · {totalGuides} guías
          </p>
        </div>

        <div className="search-wrap">
          <span className="search-icon">
            <Search size={15} />
          </span>
          <input
            type="text"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar materia o tema..."
            aria-label="Buscar materia o tema"
          />
          {query && (
            <button
              type="button"
              className="search-clear"
              onClick={() => setQuery('')}
              aria-label="Limpiar búsqueda"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </header>

      {filteredSubjects.length === 0 ? (
        <div className="empty-state">
          No hay resultados para "{query}".
        </div>
      ) : (
        <div className="subjects-grid">
          {filteredSubjects.map((subject) => {
            const guides = subject.guides || [];

            return (
              <section key={subject.id} className="subject-card">
                <div className="subject-head" onClick={() => onSelect(subject)}>
                  <div className="subject-title-row">
                    <span
                      className="subject-dot"
                      style={{ backgroundColor: subject.color }}
                    />
                    <h2 className="subject-name">{subject.name}</h2>
                  </div>
                  <span className="subject-short">{subject.shortName}</span>
                </div>

                <div className="guide-list">
                  {guides.map((guide, guideIndex) => {
                    const isAvailable = Boolean(guide.htmlFile);
                    return (
                      <button
                        key={guideIndex}
                        type="button"
                        className="guide-row"
                        disabled={!isAvailable}
                        onClick={() => {
                          if (isAvailable) onSelectGuide(subject, guideIndex);
                        }}
                      >
                        <span className="guide-row-title">{guide.title}</span>
                        <span className="guide-row-meta">
                          {isAvailable ? <ArrowRight size={14} /> : 'Próx.'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
