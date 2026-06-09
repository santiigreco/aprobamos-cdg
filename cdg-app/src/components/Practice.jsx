import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import questionsData from '../data/questions.json';
import { Trophy, Check, X, LogIn, ArrowRight, Info, Timer } from 'lucide-react';

export default function Practice({ onExit }) {
  const [questions, setQuestions] = useState([]);
  const [quizLength, setQuizLength] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [userName, setUserName] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyZaBt9tnYibFXmndm0iR5C_M3f6_9CoIgNBOViNUXTMMdTLf2YUp2n235DvxBWzR22jQ/exec';

  useEffect(() => {
    let interval = null;
    if (isTimerActive && !gameOver) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, gameOver]);

  const handleStartQuiz = (length) => {
    const shuffled = [...questionsData].sort(() => Math.random() - 0.5);
    const selectedQuestions = length === 'all' ? shuffled : shuffled.slice(0, length);
    setQuestions(selectedQuestions);
    setQuizLength(length);
    setIsTimerActive(true);
  };

  const handleOptionSelect = (index) => {
    if (showResult) return;
    
    setSelectedOption(index);
    setShowResult(true);
    setIsTimerActive(false);
    
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
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
      setIsTimerActive(true);
    } else {
      setGameOver(true);
      setIsTimerActive(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSaveScore = (e) => {
    e.preventDefault();
    if (!userName.trim()) return;

    setIsSaving(true);

    fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({
        name: userName.trim(),
        score: score,
        time: elapsedTime
      })
    })
    .then(() => {
      setIsSaving(false);
      onExit(); // Go back to dashboard
    })
    .catch((err) => {
      console.error('Error saving score:', err);
      setIsSaving(false);
      onExit(); 
    });
  };

  if (!quizLength) {
    return (
      <div className="animate-fade-in flex" style={{ flexDirection: 'column', alignItems: 'center' }}>
        <div className="glass-panel text-center" style={{ maxWidth: '500px', width: '100%' }}>
          <h2 className="title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Configurar Práctica</h2>
          <p className="subtitle" style={{ marginBottom: '2rem' }}>¿Cuántas preguntas quieres responder en esta sesión?</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button className="btn btn-outline" onClick={() => handleStartQuiz(10)} style={{ justifyContent: 'center', fontSize: '1.1rem', padding: '1rem' }}>
              10 Preguntas (Ronda Rápida)
            </button>
            <button className="btn btn-outline" onClick={() => handleStartQuiz(20)} style={{ justifyContent: 'center', fontSize: '1.1rem', padding: '1rem' }}>
              20 Preguntas (Modo Examen)
            </button>
            <button className="btn btn-accent" onClick={() => handleStartQuiz('all')} style={{ justifyContent: 'center', fontSize: '1.1rem', padding: '1rem' }}>
              Todas las Preguntas (Modo Maratón)
            </button>
          </div>
          
          <button className="btn" onClick={onExit} style={{ marginTop: '2rem', color: 'var(--text-secondary)' }}>
            Cancelar y Volver
          </button>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="animate-fade-in flex" style={{ flexDirection: 'column', alignItems: 'center' }}>
        <div className="glass-panel text-center" style={{ maxWidth: '400px', width: '100%' }}>
          <Trophy size={64} color="#f59e0b" style={{ margin: '0 auto 1rem auto' }} />
          <h2 className="title" style={{ fontSize: '2.5rem' }}>¡Práctica Finalizada!</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <p className="subtitle" style={{ fontSize: '1.25rem', margin: 0 }}>Puntos: <strong>{score}</strong></p>
            <p className="subtitle" style={{ fontSize: '1.25rem', margin: 0 }}>Tiempo: <strong>{formatTime(elapsedTime)}</strong></p>
          </div>
          
          <form onSubmit={handleSaveScore} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Ingresa tu nombre para el Leaderboard Global:</p>
            <input
              type="text"
              className="input-field"
              placeholder="Tu nombre o apodo"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              maxLength={20}
            />
            <button type="submit" className="btn btn-accent" style={{ justifyContent: 'center' }} disabled={isSaving}>
              {isSaving ? 'Guardando...' : <><LogIn size={20} /> Guardar y Salir</>}
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
    <div className="animate-fade-in flex" style={{ flexDirection: 'column', alignItems: 'center', maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
      <div className="flex w-100" style={{ justifyContent: 'space-between', width: '100%', marginBottom: '2rem' }}>
        <p className="subtitle" style={{ margin: 0 }}>Pregunta {currentIndex + 1} de {questions.length}</p>
        <div className="flex gap-2">
          <div className="user-score" style={{ margin: 0, background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
            <Timer size={18} />
            <span style={{ width: '45px', textAlign: 'center' }}>{formatTime(elapsedTime)}</span>
          </div>
          <div className="user-score" style={{ margin: 0 }}>
            <Trophy size={18} />
            <span>{score} pts</span>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ width: '100%', padding: '3rem 2rem', marginBottom: '1.5rem' }}>
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

      {showResult && (
        <div className="animate-fade-in" style={{ width: '100%' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <Info color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ color: '#3b82f6', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Explicación Teórica</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1rem' }}>{currentQ.explanation}</p>
            </div>
          </div>

          <button 
            className="btn btn-accent" 
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', justifyContent: 'center' }}
            onClick={handleNextQuestion}
          >
            Siguiente Pregunta <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
