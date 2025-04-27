import React from 'react';
import './LoginPage.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function LoginPage({ onInstagramLogin, onFacebookLogin }) {

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('Usuario Google:', decoded);
    alert(`Hola ${decoded.name}, tu correo es: ${decoded.email}`);
  };

  const handleGoogleFailure = () => {
    console.log('Error al iniciar sesión con Google');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Sign in with</h2>

        {/* Botón Instagram */}
        <button className="instagram-btn" onClick={onInstagramLogin}>
          <i className="fab fa-instagram"></i> Instagram
        </button>

        {/* Botón Facebook */}
        <button className="facebook-btn" onClick={onFacebookLogin}>
          <i className="fab fa-facebook-f"></i> Facebook
        </button>

        {/* Botón Google */}
        <div className="google-login-btn">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
        </div>

        <p>Iniciar de otra forma</p>
        <small>Crear una cuenta</small>
      </div>
    </div>
  );
}

export default LoginPage;
