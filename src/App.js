import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Grid from './components/Grid';
import Popup from './components/Popup';
import usePopup from './hooks/usePopup';
import useLogin from './components/LogIn/UseLogIn';
import './index.css';
import logo from '../src/assets/imagenes/Mulaka.jpg';
import LoginGeneral from './components/LogIn/LoginGeneral';
import AnswerInput from './components/AnswerInput';
import useSolvedCells from './hooks/useSolvedCells';
import RecoveryPage from './components/LogIn/RecoveryPage';
 //import Cookies from 'js-cookie'; // ya no se necesita aqui
import useTickets from './hooks/useTickets';
import CrearCuenta from './components/LogIn/CrearCuenta';
import { addTicket } from './utils/ticketService';
import { registrarIntentoCorrecto, registrarIntentoIncorrecto } from './utils/intentosService';
import useCasillas from './hooks/useCasillas';

const App = () => {
  const { ticketCount, refresh: refreshTickets } = useTickets();
  const { popupMode, popupData, openQuestion, handleAnswer, closePopup, timeLeft } = usePopup();
  const { solved, toggle } = useSolvedCells();
  const { casillas, fetchCasillas } = useCasillas();
  const currentCellRef = useRef(null);

  const {
    username, showLogin,
    handleFacebookLogin, handleInstagramLogin,
    handleGoogleSuccess, handleGoogleFailure,
    handleLogout, handleNormalLogin
  } = useLogin();

  useEffect(() => {
    if (!Array.isArray(casillas)) return;
    console.log('Casillas recibidas:', casillas);
    const descubiertas = casillas.filter(c => c.estado === 'descubierta');
    console.log('Casillas descubiertas:', descubiertas);
  }, [casillas]);

  const ocuparCasilla = async (idCasilla) => {
    try {
      await fetch(`${process.env.REACT_APP_URL_IMAGEN}/casilla/ocupar`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idCasilla, idImagen: 1 })
      });
      console.log(`Casilla ${idCasilla} ocupada`);
      fetchCasillas();
    } catch (err) {
      console.error('Error ocupando casilla:', err);
    }
  };

  const handleCellClick = async (idCasilla) => {
    console.log('Click en casilla:', idCasilla);

    try {
      const res = await fetch(`${process.env.REACT_APP_URL_CRUD_SERVER}/casilla/${idCasilla}`);
      if (!res.ok) throw new Error('Error consultando casilla');

      const cell = await res.json();

      if (cell.estado === 'libre') {
        console.log('Casilla libre');
        currentCellRef.current = idCasilla;
        openQuestion(cell.idPregunta);
        ocuparCasilla(idCasilla);
      } else {
        console.log('Casilla no disponible:', cell.estado);
      }
    } catch (error) {
      console.error('Error buscando casilla:', error);
    }
  };

  const liberarCasilla = async (idCasilla) => { // no se que debe hace este metodo, pero la casilla no se libera
    try {
      await fetch(`${process.env.REACT_APP_URL_IMAGEN}/casilla/liberar`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idCasilla, idImagen: 1 })
      });
      console.log(`Casilla ${idCasilla} liberada`);
    } catch (error) {
      console.error('Error liberando casilla:', error);
    }
  };

  const descubrirCasilla = async (idCasilla) => {
    try {
      await fetch(`${process.env.REACT_APP_URL_IMAGEN}/casilla/descubrir`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idCasilla, idImagen: 1 })
      });
      console.log(`Casilla ${idCasilla} descubierta`);
      fetchCasillas();
    } catch (err) {
      console.error('Error descubriendo casilla:', err);
    }
  };

  const handleAnswerWithSolved = async (answer, auto) => {
    const wasCorrect = handleAnswer(answer, auto);

    if (wasCorrect) {
      await registrarIntentoCorrecto(currentCellRef.current, 1)
      descubrirCasilla(currentCellRef.current);
      addTicket(false);
      refreshTickets();
    } else {
      console.log('Respuesta incorrecta', answer.option)
      await registrarIntentoIncorrecto('opcion' + answer.option, currentCellRef.current, 1);
      liberarCasilla(currentCellRef.current);
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
                casillas={Array.isArray(casillas) ? casillas : []}
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
