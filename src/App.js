import React, { useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom'; // SOLO Routes y Route aquí
import Header from './components/Header';
import Grid from './components/Grid';
import Popup from './components/Popup';
import usePopup from './hooks/usePopup';
import useLogin from './components/LogIn/UseLogIn'; // Hook con la lógica de login
import './index.css';
import logo from '../src/assets/imagenes/LogoLienzo.jpg';
import LoginGeneral from './components/LogIn/LoginGeneral'; // Nuevo nombre claro
import AnswerInput from './components/AnswerInput';
import useSolvedCells from './hooks/useSolvedCells';
import RecoveryPage from './components/LogIn/RecoveryPage';

const App = () => {
  const { popupMode, popupData, openQuestion, handleAnswer, closePopup, timeLeft } = usePopup();
  const { 
    username, showLogin, 
    handleFacebookLogin, handleInstagramLogin, 
    handleGoogleSuccess, handleGoogleFailure, 
    handleLogout, handleNormalLogin 
  } = useLogin();

  const handleCellClick = (num) => {
    if (solved.has(num)) return;
    currentCellRef.current = num;
    openQuestion(num);
  };

  const handleAnswerWithSolved = (answer, auto) => {
    const wasCorrect = handleAnswer(answer, auto);
    if (wasCorrect) {
      toggle(currentCellRef.current);
    }
  };

  return (
    <>
      <Header username={username} onLogout={handleLogout} />

      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={
            <>
              <Grid
                onItemClick={handleCellClick}
                bgImage={logo}
                solvedCells={solved}
                size={600}
                side={15}
              />
                 <AnswerInput />
                  
              {popupMode && (
                <Popup
                  mode={popupMode}
                  data={{ ...popupData, timeLeft }}
                  onClose={closePopup}
                  onAnswer={handleAnswerWithSolved}
                />
              )}
              {showLogin && (
                <LoginGeneral
                  onInstagramLogin={handleInstagramLogin}
                  onFacebookLogin={handleFacebookLogin}
                  onGoogleSuccess={handleGoogleSuccess}
                  onGoogleFailure={handleGoogleFailure}
                  handleNormalLogin={handleNormalLogin}
                />
              )}
            </>
          } />
          {<Route path="/recuperar" element={<RecoveryPage />} />
        }
        </Routes>
      </main>
    </>
  );
};

export default App;