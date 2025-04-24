import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Grid from './components/Grid';
import Popup from './components/Popup';
import usePopup from './hooks/usePopup';
import './index.css'; // tu CSS global

const App = () => {
  const {
    popupMode,
    popupData,
    openQuestion,
    handleAnswer,
    closePopup,
    timeLeft
  } = usePopup();
  
  const [username, setUsername] = useState('Cienfuegos');

  const handleLogout = () => {
    // Limpia tokens, contexto, etc.
    setUsername(null);
  };

  const handleCellClick = (num) => {
    console.log(`Casilla ${num} clicada`);
    openQuestion(num);  // por ejemplo, pasar el ID al hook
  };  

 

  return (
    <>
      <Header username={username} onLogout={handleLogout} />

      <main style={{ padding: '1rem' }}>

        <Grid
          onItemClick={handleCellClick}
          bgImage="/workspaces/Equipo3-Prototipo/src/assets/imagenes/hqdefault.jpg"
          size={600}
          side={15}
        />

        {popupMode && (
          <Popup
            mode={popupMode}
            data={{ ...popupData, timeLeft }}
            onClose={closePopup}
            onAnswer={handleAnswer}
          />
        )}
      </main>
    </>
  );
};

export default App;

