import React, { useState } from 'react';
import './UserMenu.css';

const UserMenu = ({ username, onLogout }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="user-menu">
      <div onClick={() => setOpen(!open)} className="user-icon">👤</div>
      {open && (
        <div className="dropdown">
          <p>{username}</p>
          <button onClick={onLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

