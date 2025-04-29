import React from 'react';

import Header from './components/Header';
import Grid from './components/Grid';
import Popup from './components/Popup';
import usePopup from './hooks/usePopup';
import useLogin from './components/LogIn/UseLogIn'; // Hook con la lógica de login
import './index.css';
import logo from '../src/assets/imagenes/LogoLienzo.jpg';
import LoginGeneral from './components/LogIn/LoginGeneral'; // Nuevo nombre claro
import AnswerInput from './components/AnswerInput';


const App = () => {
  const { popupMode, popupData, openQuestion, handleAnswer, closePopup, timeLeft } = usePopup();
  const { 
    username, showLogin, 
    handleFacebookLogin, handleInstagramLogin, 
    handleGoogleSuccess, handleGoogleFailure, 
    handleLogout, handleNormalLogin 
  } = useLogin(); // Solo una instancia

  const handleCellClick = (num) => {
    console.log(`Casilla ${num} clicada`);
    openQuestion(num);
  };

  return (
    <>
      <Header username={username} onLogout={handleLogout} />

      <main style={{ padding: '1rem' }}>
        <Grid
          onItemClick={handleCellClick}
          bgImage={logo}
          size={600}
          side={15}
        />

        <AnswerInput />

        {popupMode && (
          <Popup
            mode={popupMode}
            data={{ ...popupData, timeLeft }}
            onClose={closePopup}
            onAnswer={handleAnswer}
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