// AnswerInput.js
import React, { useState } from 'react';
import useAnswerInput from '../hooks/useAnswerInput';
import './Estilos/AnswerInput.css';

const AnswerInput = () => {
  const [answer, setAnswer] = useState("");
  const {
    popupMessage,
    showPopup,
    checkAnswer,
    closePopup,
  } = useAnswerInput();

  const handleAnswerSubmit = (event) => {
    event.preventDefault();
    checkAnswer(answer);
  };

  return (
    <>
      <form className="answer-input-container" onSubmit={handleAnswerSubmit}>
        <input
          type="text"
          placeholder="Escribe tu respuesta..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="answer-input"
        />
        <button type="submit" className="answer-button">Adivinar</button>
      </form>

      {showPopup && (
        <div className="popupAnswer">
          <div className="popupAnswer-content">
            <h2>{popupMessage}</h2>
            {popupMessage === '¡Respuesta correcta!' && (
              <p className="boleto-message">¡Has ganado un boleto!</p>
            )}
            {popupMessage === 'Respuesta incorrecta.' && (
              <p className="boleto-message">¡Sigue intentando!</p>
            )}
            <button onClick={closePopup}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AnswerInput;