import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function HtmlGuide({ htmlFile, onBack }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 50,
      background: '#0a0e1a',
    }}>
      {/* Botón flotante para volver */}
      <button
        onClick={onBack}
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          zIndex: 60,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(10, 14, 26, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(99, 102, 241, 0.4)',
          color: '#a5b4fc',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontSize: '0.9rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s',
          fontFamily: 'Inter, sans-serif',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(99, 102, 241, 0.25)';
          e.currentTarget.style.color = '#c7d2fe';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(10, 14, 26, 0.85)';
          e.currentTarget.style.color = '#a5b4fc';
        }}
      >
        <ArrowLeft size={16} /> Volver a guías
      </button>

      {htmlFile ? (
        <iframe
          src={htmlFile}
          title="Guía de Estudio"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
          }}
          allowFullScreen
        />
      ) : (
        <div style={{ color: 'white', padding: '2rem', textAlign: 'center', marginTop: '10vh' }}>
          <h2>Archivo HTML no encontrado para esta guía.</h2>
        </div>
      )}
    </div>
  );
}
