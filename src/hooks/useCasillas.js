// hooks/useCasillas.js
import { useState, useEffect } from 'react';

const baseUrl = process.env.REACT_APP_URL_CRUD_SERVER;

export default function useCasillas() {
  const [casillas, setCasillas] = useState([]);

  const fetchCasillas = async () => {
    try {
      const response = await fetch(`${baseUrl}/casilla`);
      const data = await response.json();

      console.log('Respuesta cruda de /casillas:', data);

      if (Array.isArray(data.casillas)) {
        setCasillas(data.casillas);
      } else if (Array.isArray(data)) {
        setCasillas(data); // en caso de que devuelva array plano
      } else {
        console.error('Formato inesperado en la respuesta de casillas:', data);
        setCasillas([]);
      }
    } catch (error) {
      console.error('Error al cargar casillas:', error);
    }
  };

  useEffect(() => {
    fetchCasillas();
  }, []);

  return { casillas, fetchCasillas };
}
