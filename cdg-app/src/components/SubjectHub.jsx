import React from 'react';
import { BookOpen, Brain, FileText, Globe, Wrench, Package, Cpu, ArrowRight } from 'lucide-react';

const ICON_MAP = {
  BookOpen, Brain, Globe, Wrench, Package, FileText, Cpu
};

export default function SubjectHub({ subject }) {
  return (
    <div className="animate-fade-in pb-8">
      <div className="text-center mb-4">
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: `${subject.color}22`,
            border: `1px solid ${subject.color}44`,
            color: subject.color,
            padding: '0.35rem 1.1rem',
            borderRadius: '999px',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1rem',
            letterSpacing: '0.04em',
          }}
        >
          {subject.shortName}
        </div>
        <h1 className="title" style={{ fontSize: '2.5rem' }}>{subject.name}</h1>
        <p className="subtitle">Seleccioná la guía que querés estudiar</p>
      </div>

      <div
        className="pdf-grid"
        style={{
          marginTop: '2.5rem',
          maxWidth: subject.guides && subject.guides.length > 2 ? '1050px' : '720px',
          margin: '2.5rem auto 0',
        }}
      >
        {subject.guides && subject.guides.map((guide) => {
          const isAvailable = Boolean(guide.htmlFile);
          const CardTag = isAvailable ? 'a' : 'div';

          return (
            <CardTag
              key={guide.id}
              {...(isAvailable ? { href: `#/${subject.id}/${guide.id}` } : {})}
              className="glass-panel pdf-card"
              style={{
                cursor: isAvailable ? 'pointer' : 'not-allowed',
                opacity: isAvailable ? 1 : 0.6,
                borderColor: isAvailable ? `${subject.color}55` : 'var(--surface-border)',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div style={{ 
                background: isAvailable ? `${subject.color}22` : 'var(--surface-border)', 
                padding: '1.1rem', 
                borderRadius: '14px', 
                marginBottom: '0.5rem',
                display: 'inline-block'
              }}>
                <FileText size={40} color={isAvailable ? subject.color : 'var(--text-secondary)'} />
              </div>
              <h2 style={{ fontSize: '1.5rem', margin: '0.5rem 0 0.25rem' }}>{guide.title}</h2>
              {guide.author && (
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.2rem 0.7rem',
                    borderRadius: '999px',
                    background: `${subject.color}22`,
                    border: `1px solid ${subject.color}44`,
                    color: subject.color,
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                  }}
                >
                  Por {guide.author}
                </span>
              )}
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '1.5rem' }}>
                {guide.description}
              </p>
              
              <div
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: isAvailable ? subject.color : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                {isAvailable ? (
                  <>Abrir Guía <ArrowRight size={18} /></>
                ) : (
                  'Próximamente'
                )}
              </div>
            </CardTag>
          );
        })}
      </div>
    </div>
  );
}
