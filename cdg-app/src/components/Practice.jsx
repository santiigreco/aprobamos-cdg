import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import questionsData from '../data/questions.json';
import { Trophy, Check, X, LogIn } from 'lucide-react';

export default function Practice({ onExit }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Shuffle and pick 5 questions for a quick round
    const shuffled = [...questionsData].sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffled);
  }, []);

  const handleOptionSelect = (index) => {
    if (showResult) return;
    
    setSelectedOption(index);
    setShowResult(true);
    
    const isCorrect = index === questions[currentIndex].correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#8b5cf6', '#10b981']
      });
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setShowResult(false);
      } else {
        setGameOver(true);
      }
    }, 2000); // Wait 2 seconds before next question
  };

  const handleSaveScore = (e) => {
    e.preventDefault();
    if (!userName.trim()) return;

    const leaderboard = JSON.parse(localStorage.getItem('cdg_leaderboard') || '[]');
    leaderboard.push({ name: userName.trim(), score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('cdg_leaderboard', JSON.stringify(leaderboard));
    
    onExit(); // Go back to dashboard
  };

  if (questions.length === 0) return <div>Cargando...</div>;

  if (gameOver) {
    return (
      <div className="animate-fade-in flex" style={{ flexDirection: 'column', alignItems: 'center' }}>
        <div className="glass-panel text-center" style={{ maxWidth: '400px', width: '100%' }}>
          <Trophy size={64} color="#f59e0b" style={{ margin: '0 auto 1rem auto' }} />
          <h2 className="title" style={{ fontSize: '2.5rem' }}>¡Práctica Finalizada!</h2>
          <p className="subtitle" style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Puntuación: <strong>{score} pts</strong></p>
          
          <form onSubmit={handleSaveScore} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Ingresa tu nombre para el Leaderboard:</p>
            <input
              type="text"
              className="input-field"
              placeholder="Tu nombre o apodo"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              maxLength={20}
            />
            <button type="submit" className="btn btn-accent" style={{ justifyContent: 'center' }}>
              <LogIn size={20} /> Guardar y Salir
            </button>
            <button type="button" className="btn btn-outline" onClick={onExit} style={{ justifyContent: 'center' }}>
              Salir sin guardar
            </button>
          </form>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="animate-fade-in flex" style={{ flexDirection: 'column', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>
      <div className="flex w-100" style={{ justifyContent: 'space-between', width: '100%', marginBottom: '2rem' }}>
        <p className="subtitle" style={{ margin: 0 }}>Pregunta {currentIndex + 1} de {questions.length}</p>
        <div className="user-score" style={{ margin: 0 }}>
          <Trophy size={18} />
          <span>{score} pts</span>
        </div>
      </div>

      <div className="glass-panel" style={{ width: '100%', padding: '3rem 2rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem', textAlign: 'center' }}>
          {currentQ.question}
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {currentQ.options.map((option, idx) => {
            let bgColor = 'rgba(15, 23, 42, 0.6)'; // default
            let borderColor = 'var(--surface-border)';
            let icon = null;

            if (showResult) {
              if (idx === currentQ.correctAnswer) {
                bgColor = 'rgba(16, 185, 129, 0.2)'; // green
                borderColor = '#10b981';
                icon = <Check size={20} color="#10b981" />;
              } else if (idx === selectedOption) {
                bgColor = 'rgba(239, 68, 68, 0.2)'; // red
                borderColor = '#ef4444';
                icon = <X size={20} color="#ef4444" />;
              }
            } else if (selectedOption === idx) {
              borderColor = 'var(--primary-color)';
            }

            return (
              <button
                key={idx}
                className="input-field"
                style={{ 
                  background: bgColor, 
                  borderColor: borderColor,
                  textAlign: 'left',
                  cursor: showResult ? 'default' : 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                onClick={() => handleOptionSelect(idx)}
                disabled={showResult}
              >
                <span>{option}</span>
                {icon}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
