// import React from 'react';
import './PagAdmin.css'; 
import LoginGeneral from '../LogIn/LoginGeneral';
import App from '../../App';
import React, { useEffect, useState } from 'react';


function PagAdmin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://super-fishstick-69g67ww4xxxw2r7pq-2025.app.github.dev') // <== usa aquí tu dirección real
      .then(response => response.json())
      .then(data => {
        // Aquí puedes añadir un campo ficticio `score` si aún no está
        const usersWithScores = data.map(user => ({
          id: user.idUsuario,
          name: user.usuario,
          email: user.contacto, // Eliminar esto si es necesario
          score: Math.floor(Math.random() * 10) // Por ahora: simula tickets
        }));

        setUsers(usersWithScores);
      })
      .catch(error => console.error('Error al obtener usuarios:', error));
  }, []);

  const sortedUsers = [...users].sort((a, b) => b.score - a.score);

  return (
    <div className="admin-page">
      <App></App>
      <LoginGeneral></LoginGeneral>
      <h1>Panel de Administración</h1>
      <table className="score-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Tickets</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PagAdmin;