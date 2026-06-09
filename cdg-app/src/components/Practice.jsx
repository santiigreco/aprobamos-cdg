import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import questionsData from '../data/questions.json';
import { Check, X, RotateCw } from 'lucide-react';

export default function Practice({ score, onScoreUpdate }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Shuffle questions on load
    const shuffled = [...questionsData].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, []);

  const handleCorrect = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#8b5cf6', '#10b981']
    });
    onScoreUpdate(score + 10);
    nextCard();
  };

  const handleIncorrect = () => {
    nextCard();
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % questions.length);
    }, 300); // Wait for flip animation before changing content
  };

  if (questions.length === 0) return <div>Cargando...</div>;

  const currentQ = questions[currentIndex];

  return (
    <div className="animate-fade-in flex" style={{ flexDirection: 'column', alignItems: 'center' }}>
      <div className="text-center mb-4">
        <h2 className="title" style={{ fontSize: '2rem' }}>Práctica de Teoría</h2>
        <p className="subtitle">Pregunta {currentIndex + 1} de {questions.length}</p>
      </div>

      <div className="flashcard-container" onClick={() => !isFlipped && setIsFlipped(true)}>
        <div className={`flashcard glass-panel ${isFlipped ? 'flipped' : ''}`} style={{ padding: 0 }}>
          {/* Front */}
          <div className="flashcard-face">
            <span className="flashcard-badge">Toca para ver</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {currentQ.question}
            </h3>
          </div>
          
          {/* Back */}
          <div className="flashcard-face flashcard-back" style={{ borderRadius: '16px' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Respuesta:
            </h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              {currentQ.answer}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ height: '80px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {!isFlipped ? (
          <button className="btn btn-accent" onClick={() => setIsFlipped(true)}>
            <RotateCw size={20} /> Mostrar Respuesta
          </button>
        ) : (
          <>
            <button className="btn" style={{ backgroundColor: 'var(--danger)' }} onClick={handleIncorrect}>
              <X size={20} /> No lo sabía
            </button>
            <button className="btn" style={{ backgroundColor: 'var(--success)' }} onClick={handleCorrect}>
              <Check size={20} /> Lo sabía (+10)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
