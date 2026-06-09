import React from 'react';
import { FileText, Download } from 'lucide-react';

export default function Notes() {
  const pdfs = [
    { name: 'Teoria CDG Gatti 1P Nacif.pdf', title: 'Teoría Gatti (Preguntas y Respuestas)', description: '40 preguntas clave para el parcial.' },
    { name: 'Control de Gestion 1°P.pdf', title: 'Apunte Control de Gestión', description: 'Material teórico y práctico base de la materia.' },
    { name: 'Resumen 1er Parcial.pdf', title: 'Resumen 1er Parcial', description: 'Resumen completo de todos los temas.' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-4">
        <h2 className="title" style={{ fontSize: '2rem' }}>Tus Apuntes</h2>
        <p className="subtitle">Visualiza o descarga el material de estudio.</p>
      </div>

      <div className="pdf-grid" style={{ marginTop: '2rem' }}>
        {pdfs.map((pdf, index) => (
          <div key={index} className="glass-panel pdf-card" style={{ padding: '1.5rem', alignItems: 'flex-start', textAlign: 'left' }}>
            <div className="flex gap-4 align-center w-100" style={{ marginBottom: '1rem', width: '100%' }}>
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '12px' }}>
                <FileText size={32} color="#ef4444" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{pdf.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>PDF Document</p>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1 }}>
              {pdf.description}
            </p>
            <div className="flex gap-2" style={{ width: '100%' }}>
              <a href={`/apuntes/${encodeURIComponent(pdf.name)}`} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                Ver Online
              </a>
              <a href={`/apuntes/${encodeURIComponent(pdf.name)}`} download className="btn btn-accent" style={{ padding: '0.75rem' }}>
                <Download size={20} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
