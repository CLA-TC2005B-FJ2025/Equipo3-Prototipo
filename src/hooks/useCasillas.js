// hooks/useCasillas.js
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';


const baseUrl = process.env.REACT_APP_URL_CRUD_SERVER;
const socketUrl = process.env.REACT_APP_URL_IMAGEN; // 2026

export default function useCasillas() {
  const [casillas, setCasillas] = useState([]);

  const fetchCasillas = async () => {
    const r = await fetch(`${baseUrl}/casilla`);
    const d = await r.json();
    setCasillas(Array.isArray(d.casillas) ? d.casillas : d);
  };

  /* carga inicial */
  useEffect(() => { fetchCasillas(); }, []);

  /* suscripción tiempo-real */
  useEffect(() => {
    const socket = io(socketUrl, { transports: ['websocket'] });

    socket.on('casilla:update', (upd) => {
      setCasillas(prev =>
        prev.map(c =>
          c.idCasilla === upd.idCasilla ? { ...c, estado: upd.estado } : c
        )
      );
    });

    return () => socket.disconnect();
  }, []);

  return { casillas, fetchCasillas };
}