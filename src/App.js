import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Grid from './components/Grid';
import Popup from './components/Popup';
import usePopup from './hooks/usePopup';
import './index.css'; // tu CSS global

const App = () => {
  const [username, setUsername] = useState('Cienfuegos');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpia tokens, contexto, etc.
    setUsername(null);
    navigate('/login');
  };

  const {
    popupMode,
    popupData,
    openQuestion,
    handleAnswer,
    closePopup,
    timeLeft
  } = usePopup();

  return (
    <>
      <Header username={username} onLogout={handleLogout} />

      <main style={{ padding: '1rem' }}>
        <h1>Cuadrícula + Pop-up</h1>

        <Grid
          onItemClick={openQuestion}
          bgImage="/img/mi-fondo.jpg"
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

