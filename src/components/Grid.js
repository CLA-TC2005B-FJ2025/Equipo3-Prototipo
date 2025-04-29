import React from 'react';
import './Grid.css';
import logo from '../assets/imagenes/LogoLienzo.jpg'

const Grid = ({
  side = 15,
  size = 600,

  onItemClick,
  solvedCells = new Set(),
  bgImage = logo
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
{cells.map((n) => {
  const isRevealed = solvedCells.has(n);

  const cellStyle = isRevealed
    ? {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: `${side * 100}% ${side * 100}%`,
        backgroundPosition: `${
          ((n - 1) % side) * (100 / (side - 1))
        }% ${Math.floor((n - 1) / side) * (100 / (side - 1))}%`,
      }
    : {};

  return (
    <div
      key={n}
      className={`grid-item${isRevealed ? ' revealed' : ''}`}
      style={cellStyle}
      onClick={() => !isRevealed && onItemClick?.(n)}
    />
  );
})}

    </div>
  );
};

export default Grid;

