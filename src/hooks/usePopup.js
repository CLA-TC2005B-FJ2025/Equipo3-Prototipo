import { useState, useEffect, useRef } from 'react';

const usePopup = () => {
  const [popupMode, setPopupMode] = useState(null); // 'question', 'correct', 'incorrect'
  const [popupData, setPopupData] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef(null);
  const answeredRef = useRef(false); // <- para evitar múltiples respuestas automáticas

  useEffect(() => {
    if (popupMode === 'question') {
      answeredRef.current = false; // resetear al abrir una nueva pregunta

      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);

            // Si no ha respondido el usuario, marcar incorrecta automáticamente
            if (!answeredRef.current) {
              handleAnswer({ option: null, text: 'Sin respuesta (tiempo agotado)' }, true);
            }

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [popupMode]);

  const openQuestion = async () => {
    try {
      const response = await fetch('https://zany-space-broccoli-x5w6656j5xxpfv656-2025.app.github.dev/pregunta/1');
      const data = await response.json();

      setCorrectOption(data.correctOption);

      setPopupMode('question');
      setPopupData({
        question: data.pregunta,
        options: data.options
      });

      setTimeLeft(30);
    } catch (error) {
      console.error('Error al obtener la pregunta:', error);
    }
  };

  const handleAnswer = (answer, auto = false) => {
    clearInterval(timerRef.current);
    answeredRef.current = true;

    const isCorrect = answer.option === correctOption;

    setPopupMode(isCorrect ? 'correct' : 'incorrect');
    setPopupData({
      option: answer.option,
      text: auto ? 'Sin respuesta (tiempo agotado)' : answer.text,
    });
  };

  const closePopup = () => {
    clearInterval(timerRef.current);
    setPopupMode(null);
    setPopupData(null);
    setCorrectOption(null);
    setTimeLeft(30);
    answeredRef.current = false;
  };

  return {
    popupMode,
    popupData,
    openQuestion,
    handleAnswer,
    closePopup,
    timeLeft,
  };
};

export default usePopup;
