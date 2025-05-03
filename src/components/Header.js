import React from 'react';
import UserMenu from './UserMenu';
import './Header.css';
import logo from '../assets/imagenes/LogoLienzo.jpg';

const Header = ({ username, onLogout, ticketCount }) => {
  const goLienzo = () => {
    window.location.href = 'https://www.lienzo.mx/es/inicio/';
  };

  return (
    <header className="header">
      <div className="logo" onClick={goLienzo}>
        <img src={logo} alt="Lienzo Logo" />
        <h1 className="header-title">CazaCasillas</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span className="tickets">🎫 {ticketCount}</span>
        <a href="/comojugar" className="header-link">¿Cómo Jugar?</a>
        <UserMenu username={username} onLogout={onLogout} />
      </div>
    </header>

  );
};

export default Header;
