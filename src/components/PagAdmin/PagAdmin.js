import './PagAdmin.css'; 
import LogIn from './LogIn';
import App from '../../App';
import React, { useEffect, useState } from 'react';
import useLogin from '../LogIn/UseLogIn';
import Grid from '../Grid';
import useCasillas from '../../hooks/useCasillas';
import logo from '/workspaces/Equipo3-Prototipo/src/assets/imagenes/LogoLienzo.jpg';

function PagAdmin() {
  const [users, setUsers] = useState([]);
  const [imagenAdivinadaPor, setImagenAdivinadaPor] = useState('pendiente');
   const { casillas, fetchCasillas,solved } = useCasillas();

  const { 
    username, 
    showLogin, 
    handleLogout, 
    handleNormalLogin 
  } = useLogin();

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_URL_CRUD_SERVER;

    fetch(`${baseUrl}/usuario`)
      .then(response => response.json())
      .then(async data => {
        const usersWithScores = await Promise.all(
          data.map(async user => {
            try {
              const response = await fetch(`${baseUrl}/boletousuario/${user.idUsuario}`);
              const ticketData = await response.json();
              return {
                id: user.idUsuario,
                name: user.usuario,
                contacto: user.contacto,
                score: ticketData.cantidad || 0
              };
            } catch (error) {
              console.error(`Error al obtener boletos para usuario ${user.idUsuario}:`, error);
              return {
                id: user.idUsuario,
                name: user.usuario,
                contacto: user.contacto,
                score: 0
              };
            }
          })
        );

        setUsers(usersWithScores);

        // Obtener la información de la imagen
        fetch(`${baseUrl}/imagen`)
          .then(response => response.json())
          .then(imagenes => {
            const imagen = imagenes[0];
            if (imagen && imagen.idUsuario) {
              const usuario = usersWithScores.find(user => user.id === imagen.idUsuario);
              if (usuario) {
                setImagenAdivinadaPor(usuario.name);
              } else {
                setImagenAdivinadaPor('pendiente');
              }
            } else {
              setImagenAdivinadaPor('pendiente');
            }
          })
          .catch(error => {
            console.error('Error al obtener la imagen:', error);
            setImagenAdivinadaPor('pendiente');
          });
      })
      .catch(error => console.error('Error al obtener usuarios:', error));
  }, []);

  useEffect(() => {
    if (!Array.isArray(casillas)) return;
    console.log('Casillas recibidas:', casillas);
    const descubiertas = casillas.filter(c => c.estado === 'descubierta');
    console.log('Casillas descubiertas:', descubiertas);
  }, [casillas]);

  const sortedUsers = [...users].sort((a, b) => b.score - a.score);
  const totalTickets = users.reduce((acc, user) => acc + user.score, 0);

  //Aquí en la tercera línea abajo estaba App
  return (
    <div className="admin-page">
      <Grid
        bgImage={logo}
        solvedCells={solved}
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
              {sortedUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.contacto}</td>
                  <td>{user.score}</td>
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
