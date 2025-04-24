import React from 'react';
import './Grid.css';      // Asegúrate de crear/importar el CSS

const Grid = ({
  side = 15,              // número de celdas por lado     (15×15)
  size = 600,             // ancho/alto del tablero en px  (cuadrado)
  bgImage = '/workspaces/Equipo3-Prototipo/src/assets/imagenes/hqdefault.jpg',
  onItemClick
}) => {

  const total = side * side;
  const cells = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div
      className="grid-container"
      style={{
        width: size,
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

