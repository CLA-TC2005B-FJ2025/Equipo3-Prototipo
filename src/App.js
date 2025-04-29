import React, { useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom'; // SOLO Routes y Route aquí
import Header from './components/Header';
import Grid from './components/Grid';
import Popup from './components/Popup';
import usePopup from './hooks/usePopup';
import useLogin from './components/LogIn/UseLogIn'; // Hook con la lógica de login
import './index.css';
import logo from '../src/assets/imagenes/Mulaka.jpg';
import LoginGeneral from './components/LogIn/LoginGeneral'; // Nuevo nombre claro
import AnswerInput from './components/AnswerInput';
import useSolvedCells from './hooks/useSolvedCells';
import RecoveryPage from './components/LogIn/RecoveryPage';
import Cookies from 'js-cookie';
import useTickets from './hooks/useTickets';
import CrearCuenta from './components/LogIn/CrearCuenta';
import { addTicket } from './utils/ticketService';

const App = () => {
  const { ticketCount, refresh: refreshTickets } = useTickets();
  const { popupMode, popupData, openQuestion, handleAnswer, closePopup, timeLeft } = usePopup();
  const { solved, toggle } = useSolvedCells();
  const currentCellRef = useRef(null);
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
    const wasCorrect = handleAnswer(answer, auto); // ← devuelve true|false
    console.log(`Resultado de WasCorrect ${wasCorrect}`);
    console.log('resueltas ->', [...solved]);
    if (wasCorrect) 
      {
      addTicket(false); // movi la funcion de addTicket a /utils/ticketService porque la utilizaba en otro lugar
      toggle(currentCellRef.current);              // marcamos la casilla
      
      refreshTickets();
      console.log('resueltas ->', [...solved]);
      
      }
    };
    
  return (
    <>
      <Header
        username={username}
        onLogout={handleLogout}
        ticketCount={ticketCount}
      />

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
          <Route path="/recuperar" element={<RecoveryPage />} />
          <Route path="/crearcuenta" element={<CrearCuenta />} />
        </Routes>
      </main>
    </>
  );
};

export default App;