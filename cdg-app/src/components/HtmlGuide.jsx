import React from 'react';

export default function HtmlGuide({ subject }) {
  // If the subject doesn't provide an htmlFile, fallback to a 404 or empty
  const htmlFile = subject?.htmlFile || '';

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
      {htmlFile ? (
        <iframe
          src={htmlFile}
          title={`Guía – ${subject?.name}`}
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
          <h2>Archivo HTML no encontrado para esta materia.</h2>
        </div>
      )}
    </div>
  );
}
