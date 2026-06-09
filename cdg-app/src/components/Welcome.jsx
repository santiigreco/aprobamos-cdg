import React, { useState } from 'react';
import { LogIn, TrendingUp } from 'lucide-react';

export default function Welcome({ onLogin }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div className="glass-panel animate-fade-in" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <TrendingUp size={48} color="#3b82f6" style={{ marginBottom: '1rem' }} />
        <h1 className="title" style={{ fontSize: '2rem' }}>Control de Gestión</h1>
        <p className="subtitle" style={{ fontSize: '1rem', marginBottom: '2rem' }}>
          Plataforma interactiva de estudio UTN.
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            className="input-field"
            placeholder="Tu nombre o apodo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={20}
          />
          <button type="submit" className="btn btn-accent" style={{ justifyContent: 'center' }}>
            <LogIn size={20} /> Entrar y Estudiar
          </button>
        </form>
      </div>
    </div>
  );
}
