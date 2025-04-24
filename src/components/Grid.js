import React from 'react';
import './Grid.css';

const Grid = ({
  side = 15,
  size = 600,
  bgImage = '/workspaces/Equipo3-Prototipo/src/assets/imagenes/hqdefault.jpg',
  onItemClick
}) => {
  const total = side * side;
  const cells = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div
      className="grid-container"
      style={{
        '--side': side,
        width: size,
        height: size,
        backgroundImage: `url(${bgImage})`
      }}
    >
      {cells.map(n => (
        <div
          key={n}
          className="grid-item"
          onClick={() => onItemClick?.(n)}
        >
          {n}
        </div>
      ))}
    </div>
  );
};

export default Grid;

