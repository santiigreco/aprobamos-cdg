import React, { useState, useEffect } from 'react';
import { FileText, BookOpen, Calculator, CheckCircle2, Loader2 } from 'lucide-react';

export default function Notes({ subject }) {
  const [activeTab, setActiveTab] = useState('theory');
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setNotes(null);
    subject.getNotes()
      .then(data => {
        setNotes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading notes:', err);
        setLoading(false);
      });
  }, [subject]);

  if (loading) {
    return (
      <div className="animate-fade-in flex" style={{ flexDirection: 'column', alignItems: 'center', paddingTop: '4rem' }}>
        <Loader2 size={40} color="var(--primary-color)" style={{ animation: 'spin 1s linear infinite' }} />
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Cargando apuntes...</p>
      </div>
    );
  }

  if (!notes) {
    return (
      <div className="animate-fade-in text-center" style={{ paddingTop: '4rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>No se pudieron cargar los apuntes de esta materia.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="text-center mb-4">
        <h2 className="title" style={{ fontSize: '2.5rem' }}>Central de Estudio</h2>
        <p className="subtitle">Todo lo que necesitás saber, en un solo lugar.</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${activeTab === 'theory' ? 'btn-accent' : 'btn-outline'}`}
          onClick={() => setActiveTab('theory')}
        >
          <BookOpen size={18} /> Teoría Resumida
        </button>
        <button
          className={`btn ${activeTab === 'recipes' ? 'btn-accent' : 'btn-outline'}`}
          onClick={() => setActiveTab('recipes')}
        >
          <Calculator size={18} /> Recetarios Prácticos
        </button>
        <button
          className={`btn ${activeTab === 'pdfs' ? 'btn-accent' : 'btn-outline'}`}
          onClick={() => setActiveTab('pdfs')}
        >
          <FileText size={18} /> Bibliografía (PDFs)
        </button>
      </div>

      {/* ── TEORÍA ── */}
      {activeTab === 'theory' && (
        <div className="glass-panel animate-fade-in" style={{ textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            Conceptos Clave — {subject.name}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {notes.theory.map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(15, 23, 42, 0.4)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid var(--surface-border)',
                }}
              >
                <h4 style={{ fontSize: '1.2rem', color: item.color, marginBottom: '0.5rem' }}>
                  {item.title}
                </h4>
                <p
                  style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── RECETARIOS ── */}
      {activeTab === 'recipes' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {notes.recipes.map((recipe, ri) => (
            <div
              key={ri}
              className="glass-panel"
              style={{ textAlign: 'left', borderColor: recipe.color }}
            >
              <h3
                style={{
                  fontSize: '1.8rem',
                  marginBottom: '1.5rem',
                  color: recipe.color,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Calculator size={24} /> Receta: {recipe.title}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {recipe.steps.map((step, si) => (
                  <li
                    key={si}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      ...(step.isTip
                        ? { background: `${recipe.color}18`, padding: '1rem', borderRadius: '8px' }
                        : {}),
                    }}
                  >
                    <CheckCircle2
                      color={step.isTip ? '#f59e0b' : recipe.color}
                      style={{ flexShrink: 0, marginTop: '4px' }}
                    />
                    <div>
                      <strong
                        style={{
                          fontSize: '1.1rem',
                          color: step.isTip ? '#f59e0b' : 'var(--text-primary)',
                        }}
                      >
                        {step.title}
                      </strong>
                      <p
                        style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}
                        dangerouslySetInnerHTML={{ __html: step.content }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* ── PDFs ── */}
      {activeTab === 'pdfs' && (
        <div className="pdf-grid">
          {notes.pdfs.map((pdf, index) => (
            <div
              key={index}
              className="glass-panel pdf-card"
              style={{ padding: '1.5rem', alignItems: 'flex-start', textAlign: 'left' }}
            >
              <div
                className="flex gap-4 align-center"
                style={{ marginBottom: '1rem', width: '100%' }}
              >
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '12px' }}>
                  <FileText size={32} color="#ef4444" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{pdf.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
                    PDF Document
                  </p>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                {pdf.description}
              </p>
              <a
                href={`/apuntes/${encodeURIComponent(pdf.name)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Ver Online
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
