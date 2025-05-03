import React from 'react';
import './Estilos/Grid.css';
import logo from '../assets/imagenes/LogoLienzo.jpg';

const Grid = ({
  side = 15,
  size = 600,
  onItemClick,
  solvedCells = new Set(),
  bgImage = logo,
  casillas = []
}) => {
  const total = side * side;
  const cells = Array.from({ length: total }, (_, i) => i + 1);

  // Mapear el estado de casillas para rápido acceso
  const casillasMap = new Map(casillas.map(c => [c.idCasilla, c]));

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
        const casilla = casillasMap.get(n);
        const estado = casilla?.estado || 'libre';
        const x = casilla?.coordenadaX || ((n - 1) % side);
        const y = casilla?.coordenadaY || Math.floor((n - 1) / side);

        const isRevealed = estado === 'descubierta';
        const isOccupied = estado === 'ocupada';

        let cellStyle = {};

        if (isRevealed) {
          // CASILLA DESCUBIERTA: mostrar fragmento de imagen
          cellStyle = {
            backgroundImage: `url(${process.env.REACT_APP_URL_IMAGEN}/fragmento/${x}/${y})`
          };
        } else if (isOccupied) {
          // CASILLA OCUPADA: ponerle color diferente
          cellStyle = {
            border: '2px solid #00FFFF',   // borde blanco brillante
            boxShadow: '0 0 10px #00FFFF', // brillo alrededor
          };
        }

        return (
          <div
            key={n}
            className={`grid-item ${estado}`}
            style={cellStyle}
            onClick={() => estado === 'libre' && onItemClick?.(n)}
          />
        );
      })}
    </div>
  );
};

export default Grid;
