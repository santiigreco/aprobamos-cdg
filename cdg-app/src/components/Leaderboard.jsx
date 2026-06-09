import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

export default function Leaderboard({ currentUser }) {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyZaBt9tnYibFXmndm0iR5C_M3f6_9CoIgNBOViNUXTMMdTLf2YUp2n235DvxBWzR22jQ/exec';

  useEffect(() => {
    fetch(SCRIPT_URL)
      .then(res => res.json())
      .then(data => {
        data.sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          if (a.time !== undefined && b.time !== undefined) return a.time - b.time;
          return 0;
        });
        setLeaders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="animate-fade-in flex" style={{ flexDirection: 'column', alignItems: 'center' }}>
      <div className="text-center mb-4">
        <h2 className="title" style={{ fontSize: '2rem' }}>Leaderboard</h2>
        <p className="subtitle">Los mejores puntajes de la clase.</p>
      </div>

      <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '1rem 2rem 2rem 2rem' }}>
        {loading ? (
          <div className="text-center" style={{ color: 'var(--text-secondary)', padding: '2rem' }}>
            <p>Cargando puntajes globales...</p>
          </div>
        ) : leaders.length === 0 ? (
          <div className="text-center" style={{ color: 'var(--text-secondary)', padding: '2rem' }}>
            <p>Todavía no hay puntuaciones.</p>
            <p>¡Ve a la sección de Práctica para ser el primero!</p>
          </div>
        ) : (
          <ul className="leaderboard-list">
            {leaders.map((entry, index) => (
              <li 
                key={index} 
                className={`leaderboard-item ${entry.name === currentUser ? 'current-user' : ''}`}
                style={{ borderRadius: '8px', marginBottom: '0.5rem' }}
              >
                <div className="flex align-center">
                  <span className={`rank-badge rank-${index + 1}`}>
                    {index === 0 && <Trophy size={16} />}
                    {index === 1 && <Medal size={16} />}
                    {index === 2 && <Award size={16} />}
                    {index > 2 && index + 1}
                  </span>
                  <span style={{ fontWeight: entry.name === currentUser ? 700 : 500, fontSize: '1.1rem' }}>
                    {entry.name} {entry.name === currentUser && '(Tú)'}
                  </span>
                </div>
                <div className="flex gap-4">
                  {entry.time !== undefined && (
                    <div className="user-score" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', fontSize: '0.9rem' }}>
                      {Math.floor(entry.time / 60).toString().padStart(2, '0')}:{(entry.time % 60).toString().padStart(2, '0')}
                    </div>
                  )}
                  <div className="user-score" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                    {entry.score} pts
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
