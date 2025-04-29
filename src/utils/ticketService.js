import Cookies from 'js-cookie';

export const addTicket = async (tipo) => {
  const baseUrl = process.env.REACT_APP_URL_CRUD_SERVER;
  const idUsuario = Cookies.get('idUsuario');
  if (!idUsuario) return; // todavía no logueado

  try {
    await fetch(`${baseUrl}/boleto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo: tipo, idUsuario: Number(idUsuario) })
    });
    console.log('Boleto añadido');
  } catch (err) {
    console.error('Error creando boleto:', err);
  }
};
