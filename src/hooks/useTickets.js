import { useState, useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';

const baseUrl = process.env.REACT_APP_URL_CRUD_SERVER;

export default function useTickets () {
  const [ticketCount, setTicketCount] = useState(0);

  const idUsuario = Cookies.get('idUsuario');

  const refresh = useCallback(async () => {
    if (!idUsuario) return;
    try {
      const res = await fetch(`${baseUrl}/boletousuario/${idUsuario}`);
      const data = await res.json();
      setTicketCount(data.cantidad ?? 0);
    } catch (err) {
      console.error('Error obteniendo boletos:', err);
    }
  }, [idUsuario]);

  // Este useEffect lo llamará al cargar por primera vez
  useEffect(() => {
    refresh();
  }, [refresh]);

  return { ticketCount, refresh };
}
