import './PagAdmin.css'; 
import LogIn from './LogIn';
import App from '../../App';
import React, { useEffect, useState } from 'react';
import useLogin from '../LogIn/UseLogIn';

function PagAdmin() {
  const [users, setUsers] = useState([]);

  const { 
    username, 
    showLogin, 
    handleLogout, 
    handleNormalLogin 
  } = useLogin();

  useEffect(() => {
    const baseUrl = 'https://stunning-adventure-977qp4xv9prp27j4v-2025.app.github.dev';

    fetch(`${baseUrl}/usuario`)
      .then(response => response.json())
      .then(async data => {
        // Obtener boletos para cada usuario en paralelo
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
      })
      .catch(error => console.error('Error al obtener usuarios:', error));
  }, []);

  const sortedUsers = [...users].sort((a, b) => b.score - a.score);
  const totalTickets = users.reduce((acc, user) => acc + user.score, 0);

  return (
    <div className="admin-page">
      <App />
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
        </>
      )}
    </div>
  );
}

export default PagAdmin;
