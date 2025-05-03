import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export default function useLogin() { // THIS
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
    handleLogout,
    setShowLogin
  };
}
