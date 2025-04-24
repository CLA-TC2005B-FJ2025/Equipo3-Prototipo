import React from 'react';
import './Grid.css';
import logo from '../assets/imagenes/LogoLienzo.jpg'

const Grid = ({
  side = 15,
  size = 600,

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
        backgroundImage: `url(${logo})`
      }}
    >
      {cells.map(n => (
        <div
          key={n}
          className="grid-item"
          onClick={() => onItemClick?.(n)}
        >
         {/*{n}*/}
        </div>
      ))}
    </div>
  );
};

export default Grid;

