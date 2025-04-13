import React from 'react';
import './Popup.css';

const Popup = ({ mode, data, onClose, onAnswer }) => {
  const renderContent = () => {
    switch (mode) {
      case 'question':
        return (
          <>
            <h2>{data.question}</h2>
            <div className="answers-grid">
              {Array.isArray(data.options) && data.options.map(opt => (
                <button
                  key={opt.option}
                  onClick={() => onAnswer(opt)}
                  className={`answer-btn option-${opt.option.toLowerCase()}`}
                >
                  <span className="option">{opt.option}</span> {opt.text}
                </button>
              ))}
            </div>
          </>
        );

      case 'correct':
        return (
          <>
          
            <h2>¡Correcto!</h2>
            <p>Un boleto se ha añadido a tu perfil</p>
            <div className="answer-box correct">
            
              <span className="option-letter">{data.option}</span> {data.text}
            </div>
            <button className="btn-return" onClick={onClose}>Volver</button>
          </>
        );

      case 'incorrect':
        return (
          <>
            <h2>Incorrecto…</h2>
            <p>
              Tienes un time out de 1 minuto para volver a contestar esta pregunta,<br />
              pero puedes seguir jugando
            </p>
            <div className="answer-box incorrect">
              <span className="option-letter">{data.option}</span> {data.text}
            </div>
            <button className="btn-return" onClick={onClose}>Volver</button>
          </>
        );

      default:
        return <p>Error: modo no soportado</p>;
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="popup-close" onClick={onClose}>✖</button>
        <div className="popup-content">
        {mode === 'question' && typeof data.timeLeft !== 'undefined' && (
          <div className="timer">
            <span role="img" aria-label="timer">⏰</span> 00:{data.timeLeft}s
          </div>
        )}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Popup;
