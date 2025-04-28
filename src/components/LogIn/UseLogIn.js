import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export default function useLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedUsername = Cookies.get('username');
    return storedUsername ? true : false;
  });

  const [showLogin, setShowLogin] = useState(() => {
    const storedUsername = Cookies.get('username');
    return storedUsername ? false : true;
  });

  const [username, setUsername] = useState(() => {
    return Cookies.get('username') || 'Default, nunca por que esta aqui';
  });

  const apiBaseUrl = process.env.REACT_APP_URL_CRUD_SERVER || 'http://127.0.0.1:5000';
  console.log('API Base URL:', apiBaseUrl);

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

  // LOGIN NORMAL (usuario/contraseña)
  const handleNormalLogin = async (usernameInput, passwordInput) => {
    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: usernameInput, password: passwordInput }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Usuario logueado:', data.username);
        setIsLoggedIn(true);
        setShowLogin(false);
        setUsername(data.username);

        // Guardar en cookies
        Cookies.set('username', data.username, { expires: 7 });
        if (data.idUsuario) {
          Cookies.set('idUsuario', data.idUsuario, { expires: 7 });
        }

        return true;
      } else {
        const error = await response.json();
        console.error('Error de login:', error.error);
        return false;
      }
    } catch (err) {
      console.error('Error conectando al backend:', err);
      return false;
    }
  };

  // LOGIN SOCIAL - Facebook
  const handleFacebookLogin = () => {
    window.FB.login(function (response) {
      if (response.authResponse) {
        console.log('Bienvenido! Obteniendo tu información.... ');
        window.FB.api('/me', { fields: 'name' }, function (profile) {
          console.log('Usuario:', profile);
          setIsLoggedIn(true);
          setShowLogin(false);
          setUsername(profile.name);

          // Guardar en cookies
          Cookies.set('username', profile.name, { expires: 7 });
        });
      } else {
        console.log('Usuario canceló el login o no autorizó.');
      }
    }, { scope: 'public_profile' });
  };

  // LOGIN SOCIAL - Instagram (pendiente)
  const handleInstagramLogin = () => {
    alert('Login de Instagram aún no implementado');
  };

  // LOGIN SOCIAL - Google
  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('Usuario Google:', decoded);
    setIsLoggedIn(true);
    setShowLogin(false);
    setUsername(decoded.name);

    // Guardar en cookies
    Cookies.set('username', decoded.name, { expires: 7 });
  };

  const handleGoogleFailure = () => {
    console.log('Error al iniciar sesión con Google');
  };

  // LOGOUT
  const handleLogout = () => {
    setUsername(null);
    setIsLoggedIn(false);
    setShowLogin(true);

    // Eliminar cookies
    Cookies.remove('username');
    Cookies.remove('idUsuario');
  };

  return {
    isLoggedIn,
    showLogin,
    username,
    handleNormalLogin,
    handleFacebookLogin,
    handleInstagramLogin,
    handleGoogleSuccess,
    handleGoogleFailure,
    handleLogout,
    setShowLogin
  };
}
