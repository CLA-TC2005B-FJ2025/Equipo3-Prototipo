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

  const addTicket = async () => {
      const baseUrl = process.env.REACT_APP_URL_CRUD_SERVER;
      const idUsuario = Cookies.get('idUsuario');
      if (!idUsuario) return;           // todavía no logueado
    
      try {
        await fetch(`${baseUrl}/boleto`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tipo: false, idUsuario: Number(idUsuario) })
        });
        console.log('Boleto añadido');
      } catch (err) {
        console.error('Error creando boleto:', err);
      }
    };

  const handleAnswerWithSolved = (answer, auto) => {
    const wasCorrect = handleAnswer(answer, auto); // ← devuelve true|false
    console.log(`Resultado de WasCorrect ${wasCorrect}`);
    console.log('resueltas ->', [...solved]);
    if (wasCorrect) 
      {
      toggle(currentCellRef.current);              // marcamos la casilla
      addTicket();
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
          {<Route path="/recuperar" element={<RecoveryPage />} />
        }
        </Routes>
      </main>
    </>
  );
};

export default App;