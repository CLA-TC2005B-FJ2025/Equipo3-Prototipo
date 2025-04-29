// useAnswerInput.js
import { useState } from 'react';

const useAnswerInput = () => {
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [ganasteBoleto, setGanasteBoleto] = useState(false);

  const normalizar = (str) =>
    String(str).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

  const checkAnswer = async (userAnswer) => {
    const fullUrl = process.env.REACT_APP_URL_CRUD_SERVER + `/imagen/1`;

    try {
      const response = await fetch(fullUrl);
      const data = await response.json();

      const respuestaCorrecta = data.respuesta;

      if (normalizar(userAnswer) === normalizar(respuestaCorrecta)) {
        setPopupMessage('¡Respuesta correcta!');
        setGanasteBoleto(true);
      } else {
        setPopupMessage('Respuesta incorrecta. Intenta de nuevo.');
        setGanasteBoleto(false);
      }

      setShowPopup(true);
    } catch (error) {
      console.error('Error al obtener la respuesta correcta:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return {
    popupMessage,
    showPopup,
    ganasteBoleto,
    checkAnswer,
    closePopup,
  };
};

export default useAnswerInput;
