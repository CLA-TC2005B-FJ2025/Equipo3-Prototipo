import React from 'react';
import './LoginPage.css';
import { GoogleLogin } from '@react-oauth/google';

function LoginPage({ onInstagramLogin, onFacebookLogin, onGoogleSuccess, onGoogleFailure }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Sign in with</h2>

        <button className="instagram-btn" onClick={onInstagramLogin}>
          <i className="fab fa-instagram"></i> Instagram
        </button>

        <button className="facebook-btn" onClick={onFacebookLogin}>
          <i className="fab fa-facebook-f"></i> Facebook
        </button>

        <div className="google-login-btn">
          <GoogleLogin
            onSuccess={onGoogleSuccess}
            onError={onGoogleFailure}
          />
        </div>

        <p>Iniciar de otra forma</p>
        <small>Crear una cuenta</small>
      </div>
    </div>
  );
}

export default LoginPage;
