import React from 'react';
import './ComoJugar.css';

const ComoJugar = () => {
  return (
    <div className="como-jugar-container">
      <h1>Cómo Jugar</h1>
      <p><strong>¡Bienvenido a CazaCasillas!</strong><br />
        Estás a punto de participar en una de las actividades oficiales organizadas por <strong>Lienzo</strong>. Durante ella tendrás la oportunidad de ganar <strong>dos premios mayores</strong>. ¿Interesado?</p>

      <p><strong>Nota:</strong> Solo enviamos a México y Estados Unidos. Si estás en otro país, no podrás acceder a los premios.</p>

      <h2>¿Cómo puedo ganar?</h2>
      <p>Haz clic en alguna de las casillas mostradas. Estas te mostrarán una <strong>pregunta de conocimiento general</strong> que deberás contestar en <strong>menos de 30 segundos</strong>.</p>

      <p>Por cada casilla respondida correctamente, obtendrás <strong>un boleto para el Premio A</strong>. La rifa se realizará al finalizar la actividad y será anunciada en nuestras redes sociales.</p>

      <p><strong>Advertencia:</strong> Si contestas mal, recibirás un <strong>Time-Out de un minuto</strong> para esa casilla. Al hacer clic en una casilla, esta se bloquea durante tu intento, impidiendo que otros la usen al mismo tiempo. Las casillas con <strong>brillo azul claro</strong> están ocupadas o bloqueadas para ti.</p>

      <p>Consulta tus <strong>boletos para el Premio A</strong> en la parte superior de la pantalla.</p>

      <h2>¿Y el Premio B?</h2>
      <p>Además, el objetivo principal es <strong>adivinar la imagen oculta</strong> detrás del logo de Lienzo. Esta se revela poco a poco conforme aciertas preguntas y aparece con un <strong>ligero desenfoque</strong>.</p>

      <p>Escribe tu respuesta en el campo correspondiente. Si es <strong>exactamente correcta (en minúsculas)</strong>, obtendrás un <strong>boleto para el Premio B</strong> y serás contactado.</p>

      <h2>Resumen de las reglas</h2>
      <ol>
        <li>Haz clic en las casillas para responder una pregunta.</li>
        <li>Responde correctamente y obtén un boleto para el Premio A y una parte de la imagen.</li>
        <li>Respuesta incorrecta = Time-Out de un minuto para esa casilla.</li>
        <li>Casillas azul claro = ocupadas o bloqueadas temporalmente.</li>
        <li>Adivina la imagen para ganar el Premio B.</li>
        <li>La rifa del Premio A será anunciada en redes sociales.</li>
      </ol>

      <h2>Premios</h2>
      <ul>
        <li><strong>Premio A:</strong> <em>Descripción del premio</em></li>
        <li><strong>Premio B:</strong> <em>Descripción del premio</em></li>
      </ul>
    </div>
  );
};

export default ComoJugar;