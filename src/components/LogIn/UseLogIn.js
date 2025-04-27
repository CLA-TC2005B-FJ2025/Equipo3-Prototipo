import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function useLogin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [username, setUsername] = useState('Cienfuegos');

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
          setUsername(profile.name);
        });
      } else {
        console.log('Usuario canceló el login o no autorizó.');
      }
    }, { scope: 'public_profile' });
  };

  const handleInstagramLogin = () => {
    alert('Login de Instagram aún no implementado');
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('Usuario Google:', decoded);
    setIsLoggedIn(true);
    setShowLogin(false);
    setUsername(decoded.name); // Ahora sí puedes usar el nombre del usuario de Google
  };

  const handleGoogleFailure = () => {
    console.log('Error al iniciar sesión con Google');
  };

  const handleLogout = () => {
    setUsername(null);
    setIsLoggedIn(false);
    setShowLogin(true);
  };

  return {
    isLoggedIn,
    showLogin,
    username,
    handleFacebookLogin,
    handleInstagramLogin,
    handleGoogleSuccess,
    handleGoogleFailure,
    handleLogout,
    setShowLogin
  };
}
