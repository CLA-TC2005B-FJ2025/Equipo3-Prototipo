import React from 'react';
import UserMenu from './UserMenu';
import './Header.css';
import logo from '../assets/imagenes/LogoLienzo.jpg';

const Header = ({ username, onLogout }) => {
  const goLienzo = () => {
    window.location.href = 'https://www.lienzo.mx/es/inicio/';
  };

  return (
    <header className="header">
      <div className="logo" onClick={goLienzo}>
        <img src={logo} alt="Lienzo Logo" />
      </div>

      <UserMenu username={username} onLogout={onLogout} />
    </header>
  );
};

export default Header;
