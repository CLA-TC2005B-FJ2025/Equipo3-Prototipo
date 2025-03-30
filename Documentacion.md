# Documentación de la API CRUD

## Índice
1. [Base URL](#base-url)
2. [Endpoints](#endpoints)
   - [Usuario](#usuario)
   - [Boleto](#boleto)
   - [Evento](#evento)
   - [Imagen](#imagen)
   - [Casilla](#casilla)
   - [Pregunta](#pregunta)
   - [Intento Correcto](#intento-correcto)
   - [Intento Incorrecto](#intento-incorrecto)
3. [Manejo de Errores](#manejo-de-errores)

## Base URL
http://localhost:2025

## Endpoints

### Usuario

#### Obtener todos los usuarios
- **Método:** GET  
- **URL:** `/usuario`  
- **Respuesta exitosa (200 OK):**
  ```json
  [
    {
      "idUsuario": 1,
      "usuario": "valeria",
      "idEvento": 1
    }
  ]
  ```

#### Obtener un usuario específico
- **Método:** GET  
- **URL:** `/usuario/<int:id>`  
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "idUsuario": 1,
    "usuario": "valeria",
    "idEvento": 1
  }
  ```
- **Respuesta si no existe (404 Not Found):**
  ```json
  {
    "mensaje": "Registro no encontrado"
  }
  ```

#### Crear un usuario
- **Método:** POST  
- **URL:** `/usuario`  
- **Payload:**
  ```json
  {
    "usuario": "nombre_usuario",
    "idEvento": 1
  }
  ```
- **Respuesta exitosa (201 Created):**
  ```json
  {
    "mensaje": "Usuario creado"
  }
  ```
- **Error si el evento no existe (400 Bad Request):**
  ```json
  {
    "mensaje": "El evento especificado no existe"
  }
  ```

#### Actualizar un usuario
- **Método:** PUT  
- **URL:** `/usuario/<int:id>`  
- **Payload:**
  ```json
  {
    "usuario": "nuevo_nombre",
    "idEvento": 1
  }
  ```
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "mensaje": "Usuario actualizado"
  }
  ```
- **Error si el evento no existe (400 Bad Request):**
  ```json
  {
    "mensaje": "El evento especificado no existe"
  }
  ```

#### Eliminar un usuario
- **Método:** DELETE  
- **URL:** `/usuario/<int:id>`  
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "mensaje": "Usuario eliminado"
  }
  ```

### Boleto

#### Obtener todos los boletos
- **Método:** GET  
- **URL:** `/boleto`  
- **Respuesta exitosa (200 OK):**
  ```json
  [
    {
      "idBoleto": 1,
      "tipo": "VIP",
      "idUsuario": 1
    }
  ]
  ```

#### Obtener un boleto específico
- **Método:** GET  
- **URL:** `/boleto/<int:id>`  
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "idBoleto": 1,
    "tipo": "VIP",
    "idUsuario": 1
  }
  ```
- **Respuesta si no existe (404 Not Found):**
  ```json
  {
    "mensaje": "Registro no encontrado"
  }
  ```

#### Crear un boleto
- **Método:** POST  
- **URL:** `/boleto`  
- **Payload:**
  ```json
  {
    "tipo": "VIP",
    "idUsuario": 1
  }
  ```
- **Respuesta exitosa (201 Created):**
  ```json
  {
    "mensaje": "Boleto creado"
  }
  ```
- **Error si el usuario no existe (400 Bad Request):**
  ```json
  {
    "mensaje": "El usuario especificado no existe"
  }
  ```

#### Actualizar un boleto
- **Método:** PUT  
- **URL:** `/boleto/<int:id>`  
- **Payload:**
  ```json
  {
    "tipo": "General",
    "idUsuario": 1
  }
  ```
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "mensaje": "Boleto actualizado"
  }
  ```
- **Error si el usuario no existe (400 Bad Request):**
  ```json
  {
    "mensaje": "El usuario especificado no existe"
  }
  ```

#### Eliminar un boleto
- **Método:** DELETE  
- **URL:** `/boleto/<int:id>`  
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "mensaje": "Boleto eliminado"
  }
  ```

### Evento

#### Obtener todos los eventos
- **Método:** GET  
- **URL:** `/evento`  
- **Respuesta exitosa (200 OK):**
  ```json
  [
    {
      "idEvento": 1,
      "fechaInicio": "2025-04-01",
      "fechaFinal": "2025-04-05"
    }
  ]
  ```

#### Obtener un evento específico
- **Método:** GET  
- **URL:** `/evento/<int:id>`  
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "idEvento": 1,
    "fechaInicio": "2025-04-01",
    "fechaFinal": "2025-04-05"
  }
  ```
- **Respuesta si no existe (404 Not Found):**
  ```json
  {
    "mensaje": "Registro no encontrado"
  }
  ```

#### Crear un evento
- **Método:** POST  
- **URL:** `/evento`  
- **Payload:**
  ```json
  {
    "fechaInicio": "2025-04-01",
    "fechaFinal": "2025-04-05"
  }
  ```
- **Respuesta exitosa (201 Created):**
  ```json
  {
    "mensaje": "Evento creado"
  }
  ```

#### Actualizar un evento
- **Método:** PUT  
- **URL:** `/evento/<int:id>`  
- **Payload:**
  ```json
  {
    "fechaInicio": "2025-04-02",
    "fechaFinal": "2025-04-06"
  }
  ```
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "mensaje": "Evento actualizado"
  }
  ```

#### Eliminar un evento
- **Método:** DELETE  
- **URL:** `/evento/<int:id>`  
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "mensaje": "Evento eliminado"
  }
  ```

### Imagen

#### Obtener todas las imágenes
- *Método:* GET  
- *URL:* /imagen  
- *Respuesta exitosa (200 OK):*
  ```json
  [
    {
      "idImagen": 1,
      "URL": "http://ejemplo.com/imagen1.jpg",
      "estado": "aprobada",
      "respuesta": "ok",
      "idEvento": 2,
      "idUsuario": 5
    }
  ]
  ```

#### Obtener una imagen específica
- **Método:** GET  
- **URL:** /imagen/<int:id>  
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "idImagen": 1,
    "URL": "http://ejemplo.com/imagen1.jpg",
    "estado": "aprobada",
    "respuesta": "ok",
    "idEvento": 2,
    "idUsuario": 5
  }
  ```
  
- **Respuesta si no existe (404 Not Found):**
  ```json
  {
    "mensaje": "Registro no encontrado"
  }
  ```

#### Crear una imagen
- **Método:** POST  
- **URL:** /imagen  
- **Payload:**
  ```json
  {
    "URL": "http://ejemplo.com/imagen2.jpg",
    "estado": "pendiente",
    "respuesta": "en revisión",
    "idEvento": 3,
    "idUsuario": 7
  }
  ```
  
- **Respuesta exitosa (201 Created):**
  ```json
  {
    "mensaje": "Imagen creada"
  }
  ```
  
- **Error si el evento no existe (400 Bad Request):**
  ```json
  {
    "mensaje": "El evento especificado no existe"
  }
  ```

#### Actualizar una imagen
- **Método:** PUT  
- **URL:** /imagen/<int:id>  
- **Payload:**
  ```json
  {
    "URL": "http://ejemplo.com/imagen_actualizada.jpg",
    "estado": "aprobada",
    "respuesta": "confirmado",
    "idEvento": 3,
    "idUsuario": 7
  }
  ```
  
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "mensaje": "Imagen actualizada"
  }
  ```
  
- **Error si el evento no existe (400 Bad Request):**
  ```json
  {
    "mensaje": "El evento especificado no existe"
  }
  ```

#### Eliminar una imagen
- **Método:** DELETE  
- **URL:** /imagen/<int:id>  
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "mensaje": "Imagen eliminada"
  }
  ```

### Casilla

#### Obtener todas las casillas
- **Método:** GET  
- **URL:** /casilla  
- **Respuesta exitosa (200 OK):**
  ```json
  [
    {
      "idCasilla": 1,
      "idImagen": 2,
      "coordenadaX": 10,
      "coordenadaY": 20,
      "idPregunta": 5
    }
  ]
  ```

#### Obtener una casilla específica
- **Método:** GET  
- **URL:** /casilla/<int:id>  
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "idCasilla": 1,
    "idImagen": 2,
    "coordenadaX": 10,
    "coordenadaY": 20,
    "idPregunta": 5
  }
  ```
  
- **Respuesta si no existe (404 Not Found):**
  ```json
  {
    "mensaje": "Registro no encontrado"
  }
  ```

#### Crear una casilla
- **Método:** POST  
- **URL:** /casilla  
- **Payload:**
  ```json
  {
    "idImagen": 2,
    "coordenadaX": 15,
    "coordenadaY": 25,
    "idPregunta": 7
  }
  ```
  
- **Respuesta exitosa (201 Created):**
  ```json
  {
    "mensaje": "Casilla creada"
  }
  ```
  
- **Error si la imagen no existe (400 Bad Request):**
  ```json
  {
    "mensaje": "La imagen especificada no existe"
  }
  ```
  
- **Error si la pregunta no existe (400 Bad Request):**
  ```json
  {
    "mensaje": "La pregunta especificada no existe"
  }
  ```

#### Actualizar una casilla
- **Método:** PUT  
- **URL:** /casilla/<int:id>  
- **Payload:**
  ```json
  {
    "idImagen": 3,
    "coordenadaX": 30,
    "coordenadaY": 40,
    "idPregunta": 8
  }
  ```
  
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "mensaje": "Casilla actualizada"
  }
  ```
  
- **Error si la imagen no existe (400 Bad Request):**
  ```json
  {
    "mensaje": "La imagen especificada no existe"
  }
  ```
  
- **Error si la pregunta no existe (400 Bad Request):**
  ```json
  {
    "mensaje": "La pregunta especificada no existe"
  }
  ```

#### Eliminar una casilla
- **Método:** DELETE  
- **URL:** /casilla/<int:id>  
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "mensaje": "Casilla eliminada"
  }
  ```

### Pregunta

#### Obtener todas las preguntas
- **Método:** **GET**  
- **URL:** **/pregunta**  
- **Respuesta exitosa (200 OK):**
  ```json
  [
    {
      "idPregunta": 1,
      "pregunta": "¿Cuál es la capital de Francia?",
      "opcionA": "Madrid",
      "opcionB": "París",
      "opcionC": "Berlín",
      "opcionD": "Roma",
      "respuesta": "París"
    }
  ]
  ```

#### Obtener una pregunta específica
- **Método:** **GET**  
- **URL:** **/pregunta/<int:id>**  
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "idPregunta": 1,
    "pregunta": "¿Cuál es la capital de Francia?",
    "opcionA": "Madrid",
    "opcionB": "París",
    "opcionC": "Berlín",
    "opcionD": "Roma",
    "respuesta": "París"
  }
  ```
  
- **Respuesta si no existe (404 Not Found):**
  ```json
  {
    "mensaje": "Registro no encontrado"
  }
  ```

#### Crear una pregunta
- **Método:** **POST**  
- **URL:** **/pregunta**  
- **Payload:**
  ```json
  {
    "pregunta": "¿Cuál es la capital de Italia?",
    "opcionA": "Madrid",
    "opcionB": "París",
    "opcionC": "Berlín",
    "opcionD": "Roma",
    "respuesta": "Roma"
  }
  ```
  
- **Respuesta exitosa (201 Created):**
  ```json
  {
    "mensaje": "Pregunta creada"
  }
  ```

#### Actualizar una pregunta
- **Método:** **PUT**  
- **URL:** **/pregunta/<int:id>**  
- **Payload:**
  ```json
  {
    "pregunta": "¿Cuál es la capital de Alemania?",
    "opcionA": "Madrid",
    "opcionB": "París",
    "opcionC": "Berlín",
    "opcionD": "Roma",
    "respuesta": "Berlín"
  }
  ```
  
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "mensaje": "Pregunta actualizada"
  }
  ```

#### Eliminar una pregunta
- **Método:** **DELETE**  
- **URL:** **/pregunta/<int:id>**  
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "mensaje": "Pregunta eliminada"
  }
  ```
### Intento Correcto

#### Obtener todos los intentos correctos
- **Método:** GET  
- **URL:** `/intentoCorrecto`  
- **Respuesta exitosa (200 OK):**
  ```json
  [
    {
      "idCorrecto": 1,
      "idUsuario": 2,
      "idCasilla": 3,
      "idImagen": 4
    }
  ]
  ```

#### Obtener un intento correcto específico
- **Método:** GET  
- **URL:** `/intentoCorrecto/<int:id>`  
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "idCorrecto": 1,
    "idUsuario": 2,
    "idCasilla": 3,
    "idImagen": 4
  }
  ```
- **Respuesta si no existe (404 Not Found):**
  ```json
  {
    "mensaje": "Registro no encontrado"
  }
  ```

#### Crear un intento correcto
- **Método:** POST  
- **URL:** `/intentoCorrecto`  
- **Payload:**
  ```json
  {
    "idUsuario": 2,
    "idCasilla": 3,
    "idImagen": 4
  }
  ```
- **Respuesta exitosa (201 Created):**
  ```json
  {
    "mensaje": "IntentoCorrecto registrado"
  }
  ```
- **Error si el usuario no existe (400 Bad Request):**
  ```json
  {
    "mensaje": "El usuario especificado no existe"
  }
  ```
- **Error si la casilla no existe (400 Bad Request):**
  ```json
  {
    "mensaje": "La casilla especificada no existe"
  }
  ```
- **Error si la imagen no existe (400 Bad Request):**
  ```json
  {
    "mensaje": "La imagen especificada no existe"
  }
  ```

#### Eliminar un intento correcto
- **Método:** DELETE  
- **URL:** `/intentoCorrecto/<int:id>`  
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "mensaje": "IntentoCorrecto eliminado"
  }
  ```
  
### Intento Incorrecto

#### Obtener todos los intentos incorrectos
- **Método:** GET  
- **URL:** `/intentoIncorrecto`  
- **Respuesta exitosa (200 OK):**
  ```json
  [
    {
      "idIncorrecto": 1,
      "opcionElegida": "A",
      "idUsuario": 2,
      "idCasilla": 3,
      "idImagen": 5
    }
  ]
  ```

#### Obtener un intento incorrecto específico
- **Método:** GET  
- **URL:** `/intentoIncorrecto/<int:id>`  
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "idIncorrecto": 1,
    "opcionElegida": "A",
    "idUsuario": 2,
    "idCasilla": 3,
    "idImagen": 5
  }
  ```
- **Respuesta si no existe (404 Not Found):**
  ```json
  {
    "mensaje": "Registro no encontrado"
  }
  ```

#### Crear un intento incorrecto
- **Método:** POST  
- **URL:** `/intentoIncorrecto`  
- **Payload:**
  ```json
  {
    "opcionElegida": "A",
    "idUsuario": 2,
    "idCasilla": 3,
    "idImagen": 5
  }
  ```
- **Respuesta exitosa (201 Created):**
  ```json
  {
    "mensaje": "IntentoIncorrecto registrado"
  }
  ```
- **Error si el usuario no existe (400 Bad Request):**
  ```json
  {
    "mensaje": "El usuario especificado no existe"
  }
  ```
- **Error si la casilla no existe (400 Bad Request):**
  ```json
  {
    "mensaje": "La casilla especificada no existe"
  }
  ```
- **Error si la imagen no existe (400 Bad Request):**
  ```json
  {
    "mensaje": "La imagen especificada no existe"
  }
  ```

#### Eliminar un intento incorrecto
- **Método:** DELETE  
- **URL:** `/intentoIncorrecto/<int:id>`  
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "mensaje": "IntentoIncorrecto eliminado"
  }
  ```


---
## Manejo de Errores

### Errores Comunes
- **404 Not Found:** Cuando un recurso no existe.
- **400 Bad Request:** Cuando los datos proporcionados son inválidos o faltan campos requeridos.

### Errores por Relaciones en Base de Datos
La API verifica las relaciones antes de realizar operaciones para evitar violaciones de integridad, por ejemplo:

- No se puede crear/actualizar un Usuario con un `idEvento` inexistente.
- No se puede crear/actualizar un Boleto con un `idUsuario` inexistente.
- No se puede eliminar un Evento si hay Usuarios o Imágenes que lo referencian.
- No se puede eliminar un Usuario si hay Boletos, Imágenes o Intentos que lo referencian.

En todos estos casos, la API devolverá un error `400 Bad Request` con un mensaje descriptivo del problema.
