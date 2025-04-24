import React from 'react';
import './LoginPage.css'; // O el nombre que uses para el CSS

function LoginPage({ onInstagramLogin, onFacebookLogin }) {
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

        <p>Iniciar de otra forma</p>
        <small>Crear una cuenta</small>
      </div>
    </div>
  );
}

export default LoginPage;
