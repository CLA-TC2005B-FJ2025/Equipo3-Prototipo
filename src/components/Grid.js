import React from 'react';

const Grid = ({ onItemClick }) => {
  // Se crea un array de 225 elementos (15x15) con datos de ejemplo
  const gridItems = Array.from({ length: 225 }, (_, index) => ({
    id: index,
    question: `Pregunta ${index + 1}: ¿Ejemplo de pregunta?`,
    answers: ['Respuesta A', 'Respuesta B', 'Respuesta C', 'Respuesta D'],
    correct: 2  // Indica que la segunda respuesta (índice 2, considerando que el índice comienza en 1) es la correcta.
  }));

  return (
    <div className="grid-container">
      {gridItems.map((item) => (
        <div
          key={item.id}
          className="grid-item"
          onClick={() => onItemClick(item)}
        >
          {/* Puedes mostrar un número u otro contenido en la celda si lo deseas */}
        </div>
      ))}
    </div>
  );
};

export default Grid;
