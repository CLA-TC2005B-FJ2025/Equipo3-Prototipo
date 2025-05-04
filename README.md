# Este repositorio es una extensión del repositorio original "CRUD_Server_Equipo_3"

En este repositorio se aloja el frontend del proyecto del Equipo3, desarrollado en REACT, que consume los servicios web alojados en el repositorio CRUD_Server_Equipo_3.

## Prerequisitos

Antes de comenzar, asegúrate de tener activo en un Codespace "CRUD_Server_Equipo_3", así como haber creado la base de datos. Además, ten habilitado en este repositorio lo siguiente:

- **GitHub Codespaces** habilitado.
- **Docker** ejecutándose en tu Codespace.

Asimismo, es necesario modificar la línea 37 del archivo usePopup.js ubicado en la ruta src/hooks, cambiando la URL existente por aquella presente en el puerto 2025 del Codespace "CRUD_Server_Equipo_3". 

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