import React, { useState } from 'react';
import './AnswerInput.css'; // Creamos un CSS sencillo para estilizarlo

const AnswerInput = ({ onSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleAnswerSubmit = async (respuestaUsuario) => {
    respuestaUsuario.preventDefault()

    const baseUrl = process.env.REACT_APP_URL_CRUD_SERVER;
    const fullUrl = `${baseUrl}/imagen/1`;

    try {
        
      const response = await fetch(fullUrl);
      const data = await response.json();
      
      const respuestaCorrecta = data.respuesta;
      const respuestaDelUsuario = respuestaUsuario;
      console.log(respuestaCorrecta)
  
      if (respuestaDelUsuario === respuestaCorrecta) {
        console.log('¡Respuesta correcta!');
        // Aquí puedes mostrar un popup, cambiar el estado, sumar puntos, etc.
      } else {
        console.log('Respuesta incorrecta.');
        // Aquí también puedes manejar la retroalimentación
      }
    } catch (error) {
      console.error('Error al obtener la respuesta correcta:', error);
    }
  };
  

  return (
    <form className="answer-input-container" onSubmit={handleAnswerSubmit}>
      <input
        type="text"
        placeholder="Escribe tu respuesta..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="answer-input"
      />
      <button type="submit" className="answer-button">Revisar</button>
    </form>
  );
};

export default AnswerInput;
