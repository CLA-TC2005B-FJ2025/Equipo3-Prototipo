import React from 'react';
import Header from './components/Header';
import Grid from './components/Grid';
import Popup from './components/Popup';
import usePopup from './hooks/usePopup';
import useLogin from './components/LogIn/UseLogIn'; // Importamos nuestra lógica de login
import './index.css';
import logo from '../src/assets/imagenes/LogoLienzo.jpg';
import SocialLoginModal from './components/LogIn/LoginPage';

const App = () => {
  const { popupMode, popupData, openQuestion, handleAnswer, closePopup, timeLeft } = usePopup();
  const { username, showLogin, handleFacebookLogin, handleInstagramLogin, handleLogout, handleGoogleFailure, handleGoogleSuccess } = useLogin();

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
        <SocialLoginModal
          onInstagramLogin={handleInstagramLogin}
          onFacebookLogin={handleFacebookLogin}
          onGoogleSuccess={handleGoogleSuccess}
          onGoogleFailure={handleGoogleFailure}
        />
      )}
    </>
  );
};

export default App;
