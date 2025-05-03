/* src/components/PagAdmin/PagAdmin.js */
import './Estilos/PagAdmin.css';
import LogIn from './LogIn';
import React, { useEffect, useState } from 'react';
import useLogin from './hooks/UseLogInAdmin';
import Grid from '../Grid';
import useCasillas from '../../hooks/useCasillas';
import logo from '/workspaces/Equipo3-Prototipo/src/assets/imagenes/LogoLienzo.jpg';

function PagAdmin() {
  /* ──────────────── estado ──────────────── */
  const [users, setUsers]                 = useState([]);
  const [imagenAdivinadaPor, setImagenAdivinadaPor] = useState('pendiente');
  const [statsPregunta, setStatsPregunta] = useState([]);   // ← NUEVO

  /* hooks existentes */
  const { casillas } = useCasillas();
  const {
    username, showLogin,
    handleLogout, handleNormalLogin
  } = useLogin();

  /* ──────────────── usuarios + boletos + quién adivinó ──────────────── */
  useEffect(() => {
    const baseUrl = process.env.REACT_APP_URL_CRUD_SERVER;

    fetch(`${baseUrl}/usuario`)
      .then(r => r.json())
      .then(async listaUsuarios => {
        /* mapea usuarios con sus tickets */
        const usersWithScores = await Promise.all(
          listaUsuarios.map(async u => {
            try {
              const resT = await fetch(`${baseUrl}/boletousuario/${u.idUsuario}`);
              const { cantidad = 0 } = await resT.json();
              return { id: u.idUsuario, name: u.usuario, contacto: u.contacto, score: cantidad };
            } catch {
              return { id: u.idUsuario, name: u.usuario, contacto: u.contacto, score: 0 };
            }
          })
        );
        setUsers(usersWithScores);

        /* quién adivinó la imagen */
        fetch(`${baseUrl}/imagen`)
          .then(r => r.json())
          .then(imagenes => {
            const img = imagenes[0];
            if (img?.idUsuario) {
              const u = usersWithScores.find(us => us.id === img.idUsuario);
              setImagenAdivinadaPor(u ? u.name : 'pendiente');
            } else {
              setImagenAdivinadaPor('pendiente');
            }
          })
          .catch(() => setImagenAdivinadaPor('pendiente'));
      })
      .catch(err => console.error('Error usuarios:', err));
  }, []);

  /* ──────────────── estadísticas de preguntas ──────────────── */
  useEffect(() => {
    const baseUrl = process.env.REACT_APP_URL_CRUD_SERVER;

    const cargarStats = async () => {
      try {
        /* 1· obtener casillas para saber idPregunta y estado */
        const cas = await fetch(`${baseUrl}/casilla`).then(r => r.json());

        /* 2· para cada pregunta, obtener #intentos y texto */
        const rows = await Promise.all(
          cas.map(async c => {
            //const pregunares = await fetch
            const intentosRes = await fetch(`${baseUrl}/preguntaIntentos/${c.idPregunta}`);
            const {cantidad } = await intentosRes.json();
            const preguntares = await fetch(`${baseUrl}/pregunta/${c.idPregunta}`);
            const pregunta2  = await preguntares.json();
            const pregunta = pregunta2.pregunta;

            return {
              idPregunta: c.idPregunta,
              pregunta,
              intentos: cantidad,
              estado: c.estado
            };
          })
        );
        setStatsPregunta(rows);
      } catch (err) {
        console.error('Error cargando stats pregunta:', err);
      }
    };

    cargarStats();
  }, []);

  /* ──────────────── utilidades render ──────────────── */
  const sortedUsers  = [...users].sort((a, b) => b.score - a.score);
  const sortedStats = [...statsPregunta].sort((a,b)=> b.intentos - a.intentos);
  const totalTickets = users.reduce((sum, u) => sum + u.score, 0);

  /* ──────────────── render ──────────────── */
  return (
    <div className="admin-page">
      {/* Mapa de casillas */}
      <Grid
        bgImage={logo}
        solvedCells={[]}           /* puedes cambiar si ocupas solved */
        casillas={Array.isArray(casillas) ? casillas : []}
        size={600}
        side={15}
      />

      {showLogin ? (
        <LogIn handleNormalLogin={handleNormalLogin} />
      ) : (
        <>
          <h1>Panel de Administración</h1>
          <button onClick={handleLogout} style={{ marginBottom: '20px' }}>
            Cerrar sesión
          </button>

          {/* ───────── tabla ranking ───────── */}
          <table className="score-table">
            <thead>
              <tr>
                <th>Ranking</th>
                <th>ID</th>
                <th>Nombre</th>
                <th>Contacto</th>
                <th>Tickets</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((u, i) => (
                <tr key={u.id}>
                  <td>{i + 1}</td>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.contacto}</td>
                  <td>{u.score}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ───────── tabla estadísticas por pregunta ───────── */}
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

          <p style={{ marginTop: '20px', fontWeight: 'bold' }}>
            {totalTickets} de 225 casillas reveladas
          </p>
          <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
            Usuario que ha adivinado la imagen: {imagenAdivinadaPor}
          </p>
        </>
      )}
    </div>
  );
}

export default PagAdmin;
