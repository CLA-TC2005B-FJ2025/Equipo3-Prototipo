import React, { useState } from 'react';
import Popup from './Popup';
import './Popup.css'; // Incluye los estilos del popup

const App = () => {
  const [popupMode, setPopupMode] = useState(null); // 'question', 'correct', 'incorrect'
  const [popupData, setPopupData] = useState(null);

  const handleOpenQuestion = () => {
    setPopupMode('question');
    setPopupData({
      timer: '00:30',
      question: '¿De qué color es la piel de los osos polares?',
      options: [
        { option: 'A', text: 'Blanca' },
        { option: 'B', text: 'Rosa' },
        { option: 'C', text: 'Amarilla' },
        { option: 'D', text: 'Negra' },
      ]
    });
  };

  const handleAnswer = (answer) => {
    // Simula lógica de validación
    const isCorrect = answer.option === 'D';

    setPopupMode(isCorrect ? 'correct' : 'incorrect');
    setPopupData({
      option: answer.option,
      text: answer.text,
    });
  };

  const closePopup = () => {
    setPopupMode(null);
    setPopupData(null);
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Demo de Pop-up de Pregunta</h1>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button onClick={handleOpenQuestion}>Abrir pregunta</button>
      </div>

      {popupMode && (
        <Popup
          mode={popupMode}
          data={popupData}
          onClose={closePopup}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
};

export default App;
