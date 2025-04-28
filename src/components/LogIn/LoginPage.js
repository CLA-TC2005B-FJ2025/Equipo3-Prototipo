import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './LoginPage.css';

function LoginPage({ onInstagramLogin, onFacebookLogin, onGoogleSuccess, onGoogleFailure }) {
  return (
    <div className="login-social-content">
      <h3 style={{ color: 'white' }}>O inicia sesión con</h3>

      {/* Botón Instagram */}
      <button className="instagram-btn" onClick={onInstagramLogin}>
        Instagram
      </button>

      {/* Botón Facebook */}
      <button className="facebook-btn" onClick={onFacebookLogin}>
        Facebook
      </button>

      {/* Botón Google */}
      <div className="google-login-btn">
        <GoogleLogin
          onSuccess={onGoogleSuccess}
          onError={onGoogleFailure}
        />
      </div>

      <p>Iniciar de otra forma</p>
      <small>Crear una cuenta</small>
    </div>
  );
}

export default LoginPage;
