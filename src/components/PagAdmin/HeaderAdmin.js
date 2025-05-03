// HeaderAdmin.js
import React from 'react';
import './Estilos/HeaderAdmin.css';
import logo from '../../assets/imagenes/LogoLienzo.jpg';

const HeaderAdmin = ({ username, onLogout }) => {
  return (
    <header className="admin-header">
      <div className="admin-logo" onClick={() => window.location.href = '/'}>
        <img src={logo} alt="Lienzo Logo" />
        <h1>CazaCasillas - Admin</h1>
      </div>
      <div className="admin-controls">
        <span className="admin-user">👤 {username}</span>
        <button onClick={onLogout}>Cerrar sesión</button>
      </div>
    </header>
  );
};

export default HeaderAdmin;
