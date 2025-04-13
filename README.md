# Este repositorio es una extensión del repositorio original "CRUD_Server_Equipo_3"

En este segundo repositorio se aloja el frontend del proyedto del Equipo3, desarrollado en REACT, que consume servicios web alojados en el repositorio CRUD_Server_Equipo_3.

## Prerequisitos

Antes de comenzar, asegúrate de tener activo en un Codespace "CRUD_Server_Equipo_3", así como haber creado la base de datos. Además, ten habilitado en este repositorio lo siguiente:

- **GitHub Codespaces** habilitado.
- **Docker** ejecutándose en tu Codespace.

Después, es necesario modificar la línea 37 del archivo usePopup.js ubicado en ruta de src/hooks, cambiando la URL proporcionada por aquella presente en el puerto 2025 en el Codespace de "CRUD_Server_Equipo_3". 

### A continuación, instala la dependencia: 
```sh
npm install
```

### Para correr el servidor: 
```sh
npm start
```

### Recuerda hacer público el puerto correspondiente. 

