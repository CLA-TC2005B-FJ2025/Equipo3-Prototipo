import React from 'react';
import './SocialLoginModal.css';

function SocialLoginModal({ onInstagramLogin, onFacebookLogin }) {
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
        <p>Iniciar de otra forma</p>
        <small>Crear una cuenta</small>
      </div>
    </div>
  );
}

export default SocialLoginModal;
