import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';
import './Header.css';
import logo from '../assets/imagenes/LogoLienzo.jpg';


const Header = ({ username, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/')}>
        <img src={logo} alt="Logo de Lienzo" />
      </div>
      <UserMenu username={username} onLogout={onLogout} />
    </header>
  );
};

export default Header;
