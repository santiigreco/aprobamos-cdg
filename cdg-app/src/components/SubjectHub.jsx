import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function SubjectHub({ subject, onBack, onSelectGuide }) {
  const guides = subject.guides || [];

  return (
    <div>
      <button type="button" className="back-btn" onClick={onBack}>
        <ArrowLeft size={15} /> Materias
      </button>

      <header className="hub-header">
        <div className="hub-title-row">
          <span
            className="subject-dot"
            style={{ backgroundColor: subject.color, width: '11px', height: '11px' }}
          />
          <h1 className="hub-title">{subject.name}</h1>
        </div>
      </header>

      <div className="hub-grid">
        {guides.map((guide, index) => {
          const isAvailable = Boolean(guide.htmlFile);

          return (
            <button
              key={index}
              type="button"
              className="hub-card"
              disabled={!isAvailable}
              onClick={() => {
                if (isAvailable) onSelectGuide(index);
              }}
            >
              <h2 className="hub-card-title">{guide.title}</h2>
              <p className="hub-card-desc">{guide.description}</p>
              <span className="hub-card-action">
                {isAvailable ? (
                  <>
                    Abrir guía <ArrowRight size={14} />
                  </>
                ) : (
                  'Próximamente'
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
