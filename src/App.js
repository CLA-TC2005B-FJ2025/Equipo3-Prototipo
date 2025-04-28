import React, { useState, useRef } from 'react';

import Header from './components/Header';
import Grid from './components/Grid';
import Popup from './components/Popup';
import usePopup from './hooks/usePopup';
import useSolvedCells from './hooks/useSolvedCells';
import useLogin from './components/LogIn/UseLogIn'; // Hook con la lógica de login
import './index.css';
import logo from '../src/assets/imagenes/LogoLienzo.jpg';
import LoginGeneral from './components/LogIn/LoginGeneral'; // Nuevo nombre claro

const App = () => {
  const { popupMode, popupData, openQuestion, handleAnswer, closePopup, timeLeft } = usePopup();
  const { solved, toggle } = useSolvedCells();
  const currentCellRef = useRef(null);
  const { 
    username, showLogin, 
    handleFacebookLogin, handleInstagramLogin, 
    handleGoogleSuccess, handleGoogleFailure, 
    handleLogout, handleNormalLogin 
  } = useLogin(); // Solo una instancia

  const handleCellClick = (num) => {
    if (solved.has(num)) return;            // ya resuelta → ignorar
    currentCellRef.current = num;  
    openQuestion(num);
  };

  const handleAnswerWithSolved = (answer, auto) => {
    
    const wasCorrect = handleAnswer(answer, auto); // ← devuelve true|false
    console.log(`Resultado de WasCorrect ${wasCorrect}`);
    console.log('resueltas ->', [...solved]);
    if (wasCorrect) 
      {
      toggle(currentCellRef.current);              // marcamos la casilla
      console.log('resueltas ->', [...solved]);
      }
    };
    
  return (
    <>
      <Header username={username} onLogout={handleLogout} />

      <main style={{ padding: '1rem' }}>
        <Grid
          onItemClick={handleCellClick}
          bgImage={logo}
          solvedCells={solved}
          size={600}
          side={15}
        />

        {popupMode && (
          <Popup
            mode={popupMode}
            data={{ ...popupData, timeLeft }}
            onClose={closePopup}
            onAnswer={handleAnswerWithSolved}
          />
        )}
      </main>

      {showLogin && (
        <LoginGeneral
          onInstagramLogin={handleInstagramLogin}
          onFacebookLogin={handleFacebookLogin}
          onGoogleSuccess={handleGoogleSuccess}
          onGoogleFailure={handleGoogleFailure}
          handleNormalLogin={handleNormalLogin} // Aquí pasas el login normal como prop
        />
      )}
    </>
  );
};

export default App;
