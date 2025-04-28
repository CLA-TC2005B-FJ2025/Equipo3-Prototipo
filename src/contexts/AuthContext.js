import React, { createContext, useState, useCallback } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const storedUsername = Cookies.get('username');
        const storedIdUsuario = Cookies.get('idUsuario');
        return storedUsername && storedIdUsuario ? { username: storedUsername, idUsuario: storedIdUsuario } : null;
      });

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:5000'; // Valor por defecto
  console.log(apiBaseUrl);

  const login = useCallback(async (username, password) => {
    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser({ username: data.username, idUsuario: data.idUsuario });
        Cookies.set('username', data.username, { expires: 7 });
        Cookies.set('idUsuario', data.idUsuario, { expires: 7 });
        return true;    
      } else {
        const data = await response.json();
        console.error('Inicio con error:', data.error);
        return false;
      }
    } catch (error) {
      console.error('Error durante inicio:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    // Elimina la cookie del username al cerrar sesión
    Cookies.remove('username');
    Cookies.remove('idUsuario');
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};