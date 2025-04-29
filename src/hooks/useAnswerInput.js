// useAnswerInput.js
import { useState } from 'react';
import { addTicket } from '../utils/ticketService';
import Cookies from 'js-cookie';


const useAnswerInput = () => {
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const normalizar = (str) =>
    String(str).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

  const checkAnswer = async (userAnswer) => {
    const fullUrl = process.env.REACT_APP_URL_CRUD_SERVER + `/imagen/1`;
    const idusuario = Cookies.get('idUsuario');

    try {
      const response = await fetch(fullUrl);
      const data = await response.json();

      const respuestaCorrecta = data.respuesta;

      if (data.estado === false){  
        
        if (normalizar(userAnswer) === normalizar(respuestaCorrecta)) {
          setPopupMessage('¡Respuesta correcta!');
          await addTicket(true);

          await fetch(fullUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              URL: data.URL,
              estado: true,
              respuesta: data.respuesta,
              idEvento: data.idEvento,
              idUsuario: idusuario  // puede ser null si no hay
            }),
          });

        } else {
          setPopupMessage('Respuesta incorrecta.');
        }

      } else {
        setPopupMessage('Ya no se aceptan respuestas. Lo sentimos.');
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
    checkAnswer,
    closePopup,
  };
};

export default useAnswerInput;
