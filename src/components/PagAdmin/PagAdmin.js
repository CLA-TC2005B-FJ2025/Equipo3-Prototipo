import React from 'react';
import './PagAdmin.css'; 
import LoginGeneral from '../LogIn/LoginGeneral';
import App from '../../App';

function PagAdmin() {
  // Datos de ejemplo (Serán sustituídos por datos del WS)
  const users = [
    { id: 1, name: 'AlbertoAG', score: 5 },
    { id: 2, name: 'CVentura', score: 3 },
    { id: 3, name: 'JoseLuis', score: 2 },
  ];

  return (
    <div className="pag-admin">
    <App></App>
    <LoginGeneral></LoginGeneral>
      <h1>Panel de Administración</h1>
      <table className="tabla-clasificatoria">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Ticket</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PagAdmin;
