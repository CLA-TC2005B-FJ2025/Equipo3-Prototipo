import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Estilos/CrearCuenta.css';

const CrearCuenta = () => {
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();
  const apiBaseUrl = process.env.REACT_APP_URL_CRUD_SERVER || 'http://127.0.0.1:2025';

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/usuarionormal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          usuario, 
          correo, 
          contrasena 
        }),
      });

      if (response.ok) {
        alert('¡Cuenta creada exitosamente!');
        navigate('/'); // Redirigir al login
      } else {
        const error = await response.json();
        alert('Error al crear cuenta: ' + error.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error conectando al servidor');
    }
  };

  return (
    <div className="register-page">
      <div className="register-content">
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <button type="submit">Registrarme</button>
        </form>

        {/* Link para volver */}
        <div className="volver-login">
          <Link to="/">¿Ya tienes cuenta? Iniciar sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default CrearCuenta;
