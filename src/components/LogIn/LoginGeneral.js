import React, { useState } from 'react';
import LoginPage from './LoginPage'; // Login Social como contenido
import './LoginGeneral.css';

const AdminLoginWrapper = ({ 
  onInstagramLogin, onFacebookLogin, 
  onGoogleSuccess, onGoogleFailure 
}) => {
  const [adminUser, setAdminUser] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const handleAdminLogin = () => {
    if (adminUser === 'admin' && adminPassword === '1234') {
      alert('¡Admin logueado!');
      // Aquí podrías cerrar el modal
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1 style={{ fontFamily: 'monospace', color: 'white' }}>Lienzo</h1>

        <input
          type="text"
          placeholder="Ingresa el usuario de admin"
          value={adminUser}
          onChange={(e) => setAdminUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Ingresa la contraseña de admin"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        />

        <button onClick={handleAdminLogin}>Iniciar sesión</button>
        <a href="#">Olvidé mis datos de acceso</a>

        {/* Aquí sí va tu LoginPage pero como parte del modal */}
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

export default AdminLoginWrapper;
