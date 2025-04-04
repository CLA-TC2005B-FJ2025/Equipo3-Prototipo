import React, { useState } from 'react';
import Grid from './components/Grid';
import Modal from './components/Modal';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Función para manejar el clic en una celda de la cuadrícula
  const handleGridItemClick = (data) => {
    setModalData(data);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  return (
    <div>
      <Grid onItemClick={handleGridItemClick} />
      {showModal && modalData && (
        <Modal data={modalData} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
