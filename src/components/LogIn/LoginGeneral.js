import React, { useState } from 'react';
import LoginPage from './LoginPage'; // Para login social
import './LoginGeneral.css';
import { Link } from 'react-router-dom';


const LoginGeneral = ({ 
  onInstagramLogin, onFacebookLogin, 
  onGoogleSuccess, onGoogleFailure,
  handleNormalLogin // Ahora viene como prop desde App
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const success = await handleNormalLogin(username, password); // Usas la prop
    if (!success) {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1 style={{ fontFamily: 'monospace', color: 'white' }}>Lienzo</h1>

        {error && <p style={{ color: 'white' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ingresa tu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar sesión</button>
        </form>
        <small>
          <Link to="/recuperar">
            ¿Olvidaste tu contraseña?
          </Link>
        </small>


        <hr style={{ margin: '20px 0', borderColor: '#ccc' }} />
        <LoginPage
          onInstagramLogin={onInstagramLogin}
          onFacebookLogin={onFacebookLogin}
          onGoogleSuccess={onGoogleSuccess}
          onGoogleFailure={onGoogleFailure}
        />
      </div>
    </div>
  );
};

export default LoginGeneral;
