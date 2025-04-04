import React from 'react';

const Modal = ({ data, onClose }) => {
  // Maneja el clic sobre una respuesta
  const handleAnswerClick = (answerIndex) => {
    // Se compara el índice (sumando 1 para trabajar en base 1) con la respuesta correcta
    if (answerIndex === data.correct) {
      alert("¡Respuesta correcta!");
    } else {
      alert("Respuesta incorrecta.");
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p className="question-text">{data.question}</p>
        <ul className="answers-list">
          {data.answers.map((answer, index) => (
            <li key={index} onClick={() => handleAnswerClick(index + 1)}>
              {answer}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
