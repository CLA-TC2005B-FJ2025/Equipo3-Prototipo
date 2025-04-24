import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';
import './Header.css';

const Header = ({ username, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/')}>
        <img src="/workspaces/Equipo3-Prototipo/src/assets/imagenes/LogoLienzo.jpg" alt="Lienzo Logo" />
      </div>
      <UserMenu username={username} onLogout={onLogout} />
    </header>
  );
};

export default Header;
