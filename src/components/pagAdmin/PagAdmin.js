import React from 'react';
import './pagAdmin.css';

function AdminPage() {
  // Datos de ejemplo
  const users = [
    { id: 1, name: 'Alberto AG', score: 5 },
    { id: 2, name: 'CVentura', score: 4 },
    { id: 3, name: 'JoseLuis', score: 2 },
  ];

  return (
    <div className="pagAdmin">
      <h1>Panel de administrador</h1>
      <table className="tablaPuntuacion">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Puntuación</th>
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

export default AdminPage;
