import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Search, ChevronRight } from 'lucide-react';

function normalize(str = '') {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function Dashboard({ subjects, onSelect, onSelectGuide }) {
  const [query, setQuery] = useState('');
  const searchRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.key === '/' && document.activeElement !== searchRef.current) ||
          ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === 'Escape' && document.activeElement === searchRef.current) {
        setQuery('');
        searchRef.current?.blur();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const stats = useMemo(() => {
    const totalGuides = subjects.reduce(
      (acc, s) => acc + (s.guides ? s.guides.filter((g) => Boolean(g.htmlFile)).length : 0),
      0
    );
    return {
      subjectsCount: String(subjects.length).padStart(2, '0'),
      guidesCount: String(totalGuides).padStart(2, '0'),
    };
  }, [subjects]);

  const normalizedQuery = normalize(query.trim());

  const { matchedSubjects, matchedGuides } = useMemo(() => {
    if (!normalizedQuery) {
      return { matchedSubjects: subjects, matchedGuides: [] };
    }

    const guidesFound = [];
    const subjectsFound = subjects.filter((subject) => {
      const subjectText = normalize(
        `${subject.name} ${subject.shortName} ${subject.code || ''} ${subject.description}`
      );
      const subjectMatches = subjectText.includes(normalizedQuery);

      let anyGuideMatches = false;
      (subject.guides || []).forEach((guide, guideIndex) => {
        const guideText = normalize(`${guide.title} ${guide.description}`);
        if (guideText.includes(normalizedQuery) || subjectMatches) {
          anyGuideMatches = true;
          if (guideText.includes(normalizedQuery)) {
            guidesFound.push({ subject, guide, guideIndex });
          }
        }
      });

      return subjectMatches || anyGuideMatches;
    });

    return { matchedSubjects: subjectsFound, matchedGuides: guidesFound };
  }, [subjects, normalizedQuery]);

  return (
    <div className="animate-fade-in">
      {/* ── HERO EDITORIAL ── */}
      <header className="hero-header">
        <div className="hero-top-row">
          <span className="univ-tag">
            <span className="univ-tag-dot" />
            UTN FRBA · Ingeniería Industrial
          </span>

          <div className="stats-row">
            <div className="stat-pill">
              <span className="num">{stats.subjectsCount}</span>
              <span className="label">materias</span>
            </div>
            <div className="stat-pill">
              <span className="num">{stats.guidesCount}</span>
              <span className="label">guías activas</span>
            </div>
          </div>
        </div>

        <h1 className="hero-title">
          Aprobamos <span className="hero-title-accent">UTN</span>
        </h1>
        <p className="hero-desc">
          Guías maestras, bancos de parciales reales, diagramas técnicos y simuladores
          interactivos para estudiar directo al grano.
        </p>

        <div className="search-bar-wrap">
          <span className="search-icon">
            <Search size={17} />
          </span>
          <input
            ref={searchRef}
            type="text"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar materia, parcial o tema (ej: INCOTERMS, U4, Leasing, Recuperatorio)..."
            aria-label="Buscar materia o guía"
          />
          <div className="search-right-hint">
            {query ? (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setQuery('')}
              >
                ESC · Limpiar
              </button>
            ) : (
              <span className="kbd-hint">/ o ⌘K</span>
            )}
          </div>
        </div>
      </header>

      {/* ── RESULTADOS DIRECTOS DE GUÍAS (cuando hay búsqueda) ── */}
      {normalizedQuery && matchedGuides.length > 0 && (
        <section style={{ marginBottom: '26px' }}>
          <div className="section-head">
            <span className="section-label">
              Acceso directo a guías ({matchedGuides.length})
            </span>
          </div>
          <div className="search-results-stack">
            {matchedGuides.map(({ subject, guide, guideIndex }) => {
              const isAvailable = Boolean(guide.htmlFile);
              return (
                <div
                  key={`${subject.id}-${guideIndex}`}
                  className={`search-result-row ${!isAvailable ? 'is-disabled' : ''}`}
                  style={{ '--row-color': subject.color }}
                  onClick={() => {
                    if (isAvailable) onSelectGuide(subject, guideIndex);
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                      <span
                        className="sb-code"
                        style={{
                          '--card-color': subject.color,
                          '--card-accent': subject.accentColor,
                          fontSize: '11px',
                          padding: '3px 8px',
                        }}
                      >
                        {subject.code || subject.shortName}
                      </span>
                      <span className="search-result-title">
                        {subject.name} · {guide.title}
                      </span>
                    </div>
                    <p className="search-result-desc">{guide.description}</p>
                  </div>
                  <span className="guide-chip-tag">
                    {isAvailable ? <ChevronRight size={18} /> : 'Próx.'}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── BENTO GRID DE MATERIAS ── */}
      <section>
        <div className="section-head">
          <span className="section-label">
            {normalizedQuery
              ? `Materias coincidentes (${matchedSubjects.length})`
              : 'Catálogo de materias'}
          </span>
          {!normalizedQuery && (
            <span className="section-label" style={{ color: 'var(--text-dim)' }}>
              Clic en chip para abrir directo
            </span>
          )}
        </div>

        {matchedSubjects.length === 0 ? (
          <div
            className="hero-header"
            style={{ textAlign: 'center', padding: '42px 24px', marginBottom: 0 }}
          >
            <p style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '17px' }}>
              No hay coincidencias para "{query}"
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px' }}>
              Probá con otra materia o tema, o limpiá el filtro para ver todo el catálogo.
            </p>
            <button
              type="button"
              className="btn-back"
              style={{ marginTop: '16px' }}
              onClick={() => setQuery('')}
            >
              Ver todas las materias
            </button>
          </div>
        ) : (
          <div className="bento-grid">
            {matchedSubjects.map((subject) => {
              const guides = subject.guides || [];
              const activeCount = guides.filter((g) => Boolean(g.htmlFile)).length;
              const isWide = !normalizedQuery && (Boolean(subject.featured) || guides.length >= 3);

              return (
                <article
                  key={subject.id}
                  className={`bento-card ${isWide ? 'is-wide' : ''}`}
                  style={{
                    '--card-color': subject.color,
                    '--card-accent': subject.accentColor || subject.color,
                  }}
                  onClick={() => onSelect(subject)}
                >
                  <div className="bento-card-top">
                    <div className="bento-code-group">
                      <span className="sb-code">{subject.code || subject.shortName}</span>
                      <span className="bento-meta">
                        {activeCount} {activeCount === 1 ? 'guía' : 'guías'}
                      </span>
                    </div>
                    <span className="bento-arrow" aria-hidden="true">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>

                  <div>
                    <h2 className="bento-title">{subject.name}</h2>
                    <p className="bento-desc" style={{ marginTop: '6px' }}>
                      {subject.description}
                    </p>
                  </div>

                  {guides.length > 0 && (
                    <div className="bento-guides">
                      {guides.map((guide, guideIndex) => {
                        const isAvailable = Boolean(guide.htmlFile);
                        return (
                          <button
                            key={guideIndex}
                            type="button"
                            className="guide-chip"
                            disabled={!isAvailable}
                            title={isAvailable ? `Abrir ${guide.title}` : 'Próximamente'}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isAvailable) {
                                onSelectGuide(subject, guideIndex);
                              }
                            }}
                          >
                            <span className="guide-chip-text">
                              <span
                                className="guide-chip-dot"
                                style={{
                                  background: isAvailable ? subject.color : 'var(--text-dim)',
                                }}
                              />
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {guide.title}
                              </span>
                            </span>
                            <span className="guide-chip-tag">
                              {isAvailable ? '↗' : 'PRÓX'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
