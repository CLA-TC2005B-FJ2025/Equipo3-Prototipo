import { useState, useEffect, useRef } from 'react';

const usePopup = () => {
  const [popupMode, setPopupMode] = useState(null); // 'question', 'correct', 'incorrect'
  const [popupData, setPopupData] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [wasAnsweredCorrectly, setWasAnsweredCorrectly] = useState(false); // 👈 nuevo
  const timerRef = useRef(null);
  const answeredRef = useRef(false); // <- para evitar múltiples respuestas automáticas

  useEffect(() => {
    if (popupMode === 'question') {
      answeredRef.current = false;
      setWasAnsweredCorrectly(false); // 👈 resetear al abrir nueva pregunta

      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
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

  const openQuestion = async (num) => {
    const baseUrl = process.env.REACT_APP_URL_CRUD_SERVER;
    const fullUrl = `${baseUrl}/pregunta/${num}`;
  
    try {
      const response = await fetch(fullUrl);
      const data = await response.json();
  
      setCorrectOption(data.correctOption);
      setPopupMode('question');
      setPopupData({
        question: data.pregunta,
        options: data.options
      });
  
      setTimeLeft(30);
    } catch (error) {
      console.error(`Error al obtener la pregunta ${num}:`, error);
    }
  };

  const handleAnswer = (answer, auto = false) => {
    clearInterval(timerRef.current);
    answeredRef.current = true;

    const isCorrect = answer.option === correctOption;
    setWasAnsweredCorrectly(isCorrect); // 👈 aquí lo guardamos

    setPopupMode(isCorrect ? 'correct' : 'incorrect');
    setPopupData({
      option: answer.option,
      text: auto ? 'Sin respuesta (tiempo agotado)' : answer.text,
    });

    return isCorrect;
  };

  const closePopup = () => {
    clearInterval(timerRef.current);
    const result = wasAnsweredCorrectly; // 👈 lo guardamos antes de resetear
    setPopupMode(null);
    setPopupData(null);
    setCorrectOption(null);
    setTimeLeft(30);
    setWasAnsweredCorrectly(false); // 👈 limpiar para siguiente pregunta
    answeredRef.current = false;
    return result; // 👈 lo devolvemos
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
