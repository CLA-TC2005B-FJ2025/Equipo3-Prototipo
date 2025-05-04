import React from 'react';
import './Estilos/Footer.css';
import facebook from '../assets/iconos/facebook.svg'
import instagram from '../assets/iconos/instagram.svg';
import x from '../assets/iconos/x.svg';

const Footer = () => (
  <footer className="footer">
    <p>© 2025 Lienzo</p>
    <div className="social-icons">
      <a href="https://x.com/LienzoMx" target="_blank" rel="noopener noreferrer">
        <img src={x} alt="X" className="icon" />
      </a>
      <a href="https://www.instagram.com/lienzomx" target="_blank" rel="noopener noreferrer">
        <img src={instagram} alt="Instagram" className="icon" />
      </a>
      <a href="https://www.facebook.com/LienzoMexico" target="_blank" rel="noopener noreferrer">
        <img src={facebook} alt="Facebook" className="icon" />
      </a>
    </div>
  </footer>
);

export default Footer;
