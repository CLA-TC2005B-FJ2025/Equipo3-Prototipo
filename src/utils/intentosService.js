import Cookies from 'js-cookie';

const baseUrl = process.env.REACT_APP_URL_CRUD_SERVER;

export const registrarIntentoCorrecto = async (idCasilla, idImagen) => {
  const idUsuario = Cookies.get('idUsuario');
  if (!idUsuario) return;

  try {
    const res = await fetch(`${baseUrl}/intentoCorrecto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idUsuario: Number(idUsuario),
        idCasilla,
        idImagen
      })
    });

    const data = await res.json();
    console.log('Intento correcto registrado:', data);
  } catch (err) {
    console.error('Error registrando intento correcto:', err);
  }
};

export const registrarIntentoIncorrecto = async (opcionElegida, idCasilla, idImagen) => {
  const idUsuario = Cookies.get('idUsuario');
  if (!idUsuario) return;

  try {
    const res = await fetch(`${baseUrl}/intentoIncorrecto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        opcionElegida,
        idUsuario: Number(idUsuario),
        idCasilla,
        idImagen
      })
    });

    const data = await res.json();
    console.log('Intento incorrecto registrado:', data);
  } catch (err) {
    console.error('Error registrando intento incorrecto:', err);
  }
};
