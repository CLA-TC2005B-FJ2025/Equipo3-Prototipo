import './Estilos/PagAdmin.css';
import LogIn from './LogIn';
import React, { useEffect, useState } from 'react';
import useLogin from './hooks/UseLogInAdmin';
import Grid from '../Grid';
import useCasillas from '../../hooks/useCasillas';
import logo from '/workspaces/Equipo3-Prototipo/src/assets/imagenes/LogoLienzo.jpg';
import HeaderAdmin from './HeaderAdmin';


function PagAdmin() {
  const [users, setUsers] = useState([]);
  const [imagenAdivinadaPor, setImagenAdivinadaPor] = useState({ nombre: 'pendiente', contacto: 'pendiente' });
  const [statsPregunta, setStatsPregunta] = useState([]);
  const [mostrarTablaIntentos, setMostrarTablaIntentos] = useState(false);
  const [mostrarTablaUsuarios, setMostrarTablaUsuarios] = useState(false);
  const [mostrarTablaRankin, setMostrarTablaRanking] = useState(false);
  const [mostrarGrid, setMostrarGrid] = useState(true);

  const { casillas } = useCasillas();
  const {
    username, showLogin,
    handleLogout, handleNormalLogin
  } = useLogin();
  

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_URL_CRUD_SERVER;
  
    fetch(`${baseUrl}/stats/usuarios`)
      .then(r => r.json())
      .then(data => {
        setUsers(data.usuarios || []);  // Asegúrate de acceder a data.usuarios si así se envía
      })
      .catch(err => console.error('❌ Error cargando usuarios:', err));
  }, []);
  

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_URL_CRUD_SERVER;
  
    fetch(`${baseUrl}/imagen`)
      .then(r => r.json())
      .then(imagenes => {
        const img = imagenes.find(i => i.idUsuario); // primera con idUsuario asignado
        if (!img) return;
  
        fetch(`${baseUrl}/usuario/${img.idUsuario}`)
          .then(r => r.json())
          .then(usuario => {
            setImagenAdivinadaPor({
              nombre: usuario.usuario,
              contacto: usuario.contacto
            });
          })
          .catch(err => {
            console.error("❌ Error buscando usuario que adivinó la imagen:", err);
          });
      })
      .catch(err => console.error("❌ Error obteniendo imagen:", err));
  }, []);
  

  
  useEffect(() => {
    const baseUrl = process.env.REACT_APP_URL_CRUD_SERVER;
  
    fetch(`${baseUrl}/stats/preguntas`)
      .then(r => r.json())
      .then(data => {
        setStatsPregunta(data);
      })
      .catch(err => console.error('Error cargando stats:', err));
  }, []);

  const sortedUsers = [...users].sort((a, b) => b.score - a.score);
  const sortedStats = [...statsPregunta].sort((a, b) => b.intentos - a.intentos);
  const totalTickets = users.reduce((sum, u) => sum + u.score, 0);
  const totalIntentosIncorrectos = statsPregunta.reduce((sum, row) => sum + row.intentos, 0);
  const porcentajeRevelado = casillas.length > 0
  ? (casillas.filter(c => c.estado === 'descubierta').length / casillas.length) * 100
  : 0;
  


  if (showLogin) {
    return <LogIn handleNormalLogin={handleNormalLogin} />;
  }

  const tipoUsuario = sessionStorage.getItem('tipoUsuario');
  if (tipoUsuario !== 'admin') {
    return (
      <div className="admin-page">
        <h2 style={{ color: 'red' }}>Acceso restringido</h2>
        <p>Esta página solo está disponible para administradores.</p>
      </div>
    );
  }


  return (
    <>
    <HeaderAdmin username={username} onLogout={handleLogout} />
    <div className="admin-page">
      <div className="stat-caja-destacada">
        <h2>Usuario que ha adivinado la imagen</h2>
        <p>
          <strong>Usuario:</strong> {imagenAdivinadaPor.nombre}
        </p>
        <p>
          <strong>Contacto:</strong> {imagenAdivinadaPor.contacto}
        </p>
      </div>

      <div className="stat-box-container">
        <div 
              className="stat-box" 
              onClick={() => setMostrarTablaUsuarios(!mostrarTablaUsuarios)}
              style={{ cursor: 'pointer' }}
            >
              <h2>Boletos Totales:</h2>
              <p>
              {totalTickets}
              </p>
              <small>Haz clic para {mostrarTablaUsuarios ? 'ocultar' : 'ver'} detalles</small>
        </div>
        <div
          className="stat-box"
          onClick={() => setMostrarGrid(!mostrarGrid)}
          style={{
            backgroundColor: porcentajeRevelado > 75
              ? '#4caf50' // verde
              : porcentajeRevelado > 40
              ? '#ff9800' // naranja
              : '#e53935', // rojo
            color: 'white',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
        >
          <h2>Porcentaje Imagen Revelada</h2>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>
            {porcentajeRevelado.toFixed(1)}%
          </p>
          <small>Haz clic para {mostrarGrid ? 'ocultar' : 'ver'} el grid</small>
        </div>
        <div
          className="stat-box"
          onClick={() => setMostrarTablaRanking(!mostrarTablaRankin)}
          style={{ cursor: 'pointer' }}
        >
          <h2>Total de Usuarios</h2>
          <p>{users.length}</p>
          <small>Haz clic para {mostrarTablaRankin ? 'ocultar' : 'ver'} ranking</small>
        </div>
        <div 
            className="stat-box" 
            onClick={() => setMostrarTablaIntentos(!mostrarTablaIntentos)}
            style={{ cursor: 'pointer' }}
          >
            <h2>Total de Intentos Incorrectos</h2>
            <p>
              {totalIntentosIncorrectos}
            </p>
            <small>Haz clic para {mostrarTablaIntentos ? 'ocultar' : 'ver'} detalles</small>
          </div>
      </div>

      {mostrarGrid && (
        <Grid
          bgImage={logo}
          solvedCells={[]}
          casillas={Array.isArray(casillas) ? casillas : []}
          size={600}
          side={15}
        />
      )}


      {mostrarTablaRankin && (
        <table className="score-table">
          <thead>
            <tr>
              <th>Ranking</th>
              <th>Usuario</th>
              <th>Tickets</th>
            </tr>
          </thead>
          <tbody>
          {sortedUsers.map((u, i) => (
            <tr key={u.idUsuario}>
              <td>{i + 1}</td>
              <td>{u.usuario}</td>
              <td>{u.score}</td>
            </tr>
          ))}
          </tbody>
        </table>
      )}

      {mostrarTablaUsuarios && (
        <table className="score-table">
          <thead>
            <tr>
              <th>Ranking</th>
              <th>ID</th>
              <th>Usuario</th>
              <th>Contacto</th>
              <th>Tickets</th>
            </tr>
          </thead>
          <tbody>
          {sortedUsers.map((u, i) => (
            <tr key={u.idUsuario}>
              <td>{i + 1}</td>
              <td>{u.idUsuario}</td>
              <td>{u.usuario}</td>
              <td>{u.contacto}</td>
              <td>{u.score}</td>
            </tr>
          ))}
          </tbody>
        </table>
      )}


      {mostrarTablaIntentos && (
        <table className="score-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Pregunta</th>
              <th>Intentos incorrectos</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {sortedStats.map(row => (
              <tr key={row.idPregunta}>
                <td>{row.idPregunta}</td>
                <td style={{ textAlign: 'left' }}>{row.pregunta}</td>
                <td>{row.intentos}</td>
                <td>{row.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </>
  );
}

export default PagAdmin;
