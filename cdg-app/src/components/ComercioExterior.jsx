import React from 'react';

export default function ComercioExterior() {
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
      <iframe
        src="./comercio-exterior.html"
        title="Guía 1er Parcial – Comercio Exterior UTN"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
        allowFullScreen
      />
    </div>
  );
}
