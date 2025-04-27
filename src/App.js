import React, { useState, useEffect } from 'react';
import usePopup from './hooks/usePopup';
import Popup from './components/Popup';
import SocialLoginModal from './components/LoginPage'; // Si tu componente se llama así

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const { popupMode, popupData, openQuestion, handleAnswer, closePopup, timeLeft } = usePopup();

  // Cargar el SDK de Facebook
  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '1793172311242624', // ← Reemplaza con tu App ID real
        cookie     : true,
        xfbml      : true,
        version    : 'v19.0'
      });
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }, []);

  // Función de login personalizada con SDK
  const handleFacebookLogin = () => {
    window.FB.login(function(response) {
      if (response.authResponse) {
        console.log('Bienvenido! Obteniendo tu información.... ');
        window.FB.api('/me', {fields: 'name'}, function(profile) {
          console.log('Usuario:', profile);
          setIsLoggedIn(true);
          setShowLogin(false); // Cierra el modal
        },);
      } else {
        console.log('Usuario canceló el login o no autorizó.');
      }
    }, {scope: 'public_profile'});
  };

  const handleInstagramLogin = () => {
    alert('Login de Instagram aún no implementado');
  };

  return (
    <div className="App">
      {showLogin && (
        <SocialLoginModal
          onInstagramLogin={handleInstagramLogin}
          onFacebookLogin={handleFacebookLogin} // Pasamos la función aquí
        />
      )}

      {!showLogin && (
        <>
          <h1>Demo de Pop-up</h1>
          <button onClick={openQuestion}>Abrir pregunta</button>

          {popupMode && (
            <Popup
              mode={popupMode}
              data={{ ...popupData, timeLeft }}
              onClose={closePopup}
              onAnswer={handleAnswer}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
