import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './LoginPage.css';
import { Link } from 'react-router-dom';

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
      <small> <Link to="/crearcuenta">
    ¿No tienes cuenta? ¡Regístrate!
  </Link></small>
    </div>
  );
}

export default LoginPage;
