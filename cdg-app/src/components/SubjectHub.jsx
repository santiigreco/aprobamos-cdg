import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

export default function SubjectHub({ subject, onSelectGuide }) {
  const guides = subject.guides || [];
  const activeCount = guides.filter((g) => Boolean(g.htmlFile)).length;
  const upcomingCount = guides.length - activeCount;

  return (
    <div className="animate-fade-in">
      <header
        className="hero-header"
        style={{ marginBottom: '22px' }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${subject.color}, ${subject.accentColor || subject.color})`,
            zIndex: 1,
          }}
        />

        <div className="hero-top-row">
          <span
            className="sb-code"
            style={{
              '--card-color': subject.color,
              '--card-accent': subject.accentColor || subject.color,
              fontSize: '13px',
              padding: '6px 12px',
            }}
          >
            {subject.code || subject.shortName}
          </span>

          <div className="stats-row">
            <div className="stat-pill">
              <span className="num">{String(activeCount).padStart(2, '0')}</span>
              <span className="label">{activeCount === 1 ? 'guía activa' : 'guías activas'}</span>
            </div>
            {upcomingCount > 0 && (
              <div className="stat-pill">
                <span className="num">{String(upcomingCount).padStart(2, '0')}</span>
                <span className="label">próximamente</span>
              </div>
            )}
          </div>
        </div>

        <h1 className="hero-title" style={{ fontSize: 'clamp(24px, 3.6vw, 34px)' }}>
          {subject.name}
        </h1>
        <p className="hero-desc">{subject.description}</p>
      </header>

      <div className="section-head">
        <span className="section-label">Guías disponibles</span>
      </div>

      <div className="guides-grid">
        {guides.map((guide, index) => {
          const isAvailable = Boolean(guide.htmlFile);
          const indexLabel = String(index + 1).padStart(2, '0');

          return (
            <article
              key={index}
              className={`guide-card ${!isAvailable ? 'is-disabled' : ''}`}
              style={{ '--card-color': subject.color }}
              onClick={() => {
                if (isAvailable) {
                  onSelectGuide(index);
                }
              }}
            >
              <div className="guide-card-head">
                <span className="guide-index">{indexLabel}</span>
                <span className="guide-status">
                  {isAvailable ? 'INTERACTIVA' : 'PRÓXIMAMENTE'}
                </span>
              </div>

              <h2 className="guide-card-title">{guide.title}</h2>
              <p className="guide-card-desc">{guide.description}</p>

              <div className="guide-card-cta">
                {isAvailable ? (
                  <>
                    Abrir guía <ArrowRight size={16} />
                  </>
                ) : (
                  <>
                    <Clock size={15} /> En preparación
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
