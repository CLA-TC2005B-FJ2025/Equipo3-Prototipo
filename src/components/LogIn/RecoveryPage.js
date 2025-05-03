import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Estilos/RecoveryPage.css';

const RecoveryPage = () => {
  const [correo, setCorreo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [paso, setPaso] = useState(1);
  const apiBaseUrl = process.env.REACT_APP_URL_CRUD_SERVER || 'http://127.0.0.1:2025';

  const solicitarCodigo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/recuperar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo }),
      });
      if (response.ok) {
        alert('Código enviado a tu correo.');
        setPaso(2);
      } else {
        const error = await response.json();
        alert('Error al solicitar código: ' + error.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const validarCodigoYActualizar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/validarcodigo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo,
          codigo,
          nuevaContrasena,
        }),
      });
      if (response.ok) {
        alert('¡Contraseña actualizada correctamente!');
        window.location.href = '/'; 
      } else {
        const error = await response.json();
        alert('Error al validar código: ' + error.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="recovery-page">
      <div className="recovery-content">
        <h2>Recuperar Contraseña</h2>

        {paso === 1 && (
          <form onSubmit={solicitarCodigo}>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
            <button type="submit">Enviar código</button>
          </form>
        )}

        {paso === 2 && (
          <form onSubmit={validarCodigoYActualizar}>
            <input
              type="text"
              placeholder="Código recibido"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={nuevaContrasena}
              onChange={(e) => setNuevaContrasena(e.target.value)}
              required
            />
            <button type="submit">Cambiar contraseña</button>
          </form>
        )}

        {/* Botón para regresar */}
        <div className="volver-login">
          <Link to="/">¿Recordaste tu contraseña? Iniciar sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default RecoveryPage;
