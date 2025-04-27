import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import Grid from './components/Grid';
import Popup from './components/Popup';
import usePopup from './hooks/usePopup';
import './index.css';
import logo from '../src/assets/imagenes/LogoLienzo.jpg';
import SocialLoginModal from './components/LoginPage'; // asegúrate que este componente tenga la clase "modal"

const App = () => {
  const { popupMode, popupData, openQuestion, handleAnswer, closePopup, timeLeft } = usePopup();

  const [username, setUsername] = useState('Cienfuegos');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleLogout = () => {
    setUsername(null);
  };

  const handleCellClick = (num) => {
    console.log(`Casilla ${num} clicada`);
    openQuestion(num);
  };

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '3054409028042015',
        cookie: true,
        xfbml: true,
        version: 'v19.0',
      });
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  const handleFacebookLogin = () => {
    window.FB.login(function (response) {
      if (response.authResponse) {
        console.log('Bienvenido! Obteniendo tu información.... ');
        window.FB.api('/me', { fields: 'name' }, function (profile) {
          console.log('Usuario:', profile);
          setIsLoggedIn(true);
          setShowLogin(false);
        });
      } else {
        console.log('Usuario canceló el login o no autorizó.');
      }
    }, { scope: 'public_profile' });
  };

  const handleInstagramLogin = () => {
    alert('Login de Instagram aún no implementado');
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
        <>
          <div className="overlay-blocker"></div>

          <SocialLoginModal
            onInstagramLogin={handleInstagramLogin}
            onFacebookLogin={handleFacebookLogin}
          />
        </>
      )}
    </>
  );
};

export default App;

