# Este repositorio es una extensión del repositorio original "CRUD_Server_Equipo_3"

En este repositorio se aloja el frontend del proyecto del Equipo3, desarrollado en REACT, que consume los servicios web alojados en el repositorio CRUD_Server_Equipo_3.

## Prerequisitos

Antes de comenzar, asegúrate de tener activo en un Codespace "CRUD_Server_Equipo_3", así como haber creado la base de datos. Además, ten habilitado en este repositorio lo siguiente:

- **GitHub Codespaces** habilitado.
- **Docker** ejecutándose en tu Codespace.

### Para el funcionamiento correcto:
- API para LogIn de Facebook.
- API para LogIn de Google.

### Modificar la variable de entorno:
Asimismo, es necesario modificar las URLs en el archivo .env.development.
Cambiando la URL de la variable "REACT_APP_URL_CRUD_SERVER" por aquella presente en el puerto 2025 del Codespace "CRUD_Server_Equipo_3" y la URL de la variable "REACT_APP_URL_IMAGEN" por la del puerto 2026. 

### Instala la dependencia: 
```sh
npm install
```

### Inicia el servidor: 
```sh
npm start
```

Recuerda hacer público el puerto correspondiente. 

### Para realizar pruebas unitarias:
```sh
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```
```sh
npm test
```
