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
---

## Manejo de Errores

### Errores Comunes
- **404 Not Found:** Cuando un recurso no existe.
- **400 Bad Request:** Cuando los datos proporcionados son inválidos o faltan campos requeridos.

### Errores por Relaciones en Base de Datos
La API verifica las relaciones antes de realizar operaciones para evitar violaciones de integridad:

- No se puede crear/actualizar un Usuario con un `idEvento` inexistente.
- No se puede crear/actualizar un Boleto con un `idUsuario` inexistente.
- No se puede eliminar un Evento si hay Usuarios o Imágenes que lo referencian.
- No se puede eliminar un Usuario si hay Boletos, Imágenes o Intentos que lo referencian.

En todos estos casos, la API devolverá un error `400 Bad Request` con un mensaje descriptivo del problema.
