# Documentación del API REST

## Introducción
Este API proporciona operaciones CRUD (Create, Read, Update, Delete) para la gestión de usuarios, boletos, eventos, imágenes, casillas, preguntas e intentos en una base de datos SQL Server.

El servicio está construido con Flask y permite la comunicación a través de solicitudes HTTP.

## Endpoints y Ejemplos

### Usuario

#### Obtener todos los usuarios
**GET** `/usuario`

**Respuesta:**
```json
[
    {
        "idUsuario": 1,
        "usuario": "Juan Perez",
        "idEvento": 5
    }
]
```

#### Obtener un usuario por ID
**GET** `/usuario/{id}`

**Respuesta (200 OK):**
```json
{
    "idUsuario": 1,
    "usuario": "Juan Perez",
    "idEvento": 5
}
```

**Respuesta (404 Not Found):**
```json
{
    "mensaje": "Registro no encontrado"
}
```

#### Crear un usuario
**POST** `/usuario`

**Payload:**
```json
{
    "usuario": "Maria Lopez",
    "idEvento": 3
}
```

**Respuesta:**
```json
{
    "mensaje": "Usuario creado"
}
```

#### Actualizar un usuario
**PUT** `/usuario/{id}`

**Payload:**
```json
{
    "usuario": "Carlos Garcia",
    "idEvento": 2
}
```

**Respuesta:**
```json
{
    "mensaje": "Usuario actualizado"
}
```

#### Eliminar un usuario
**DELETE** `/usuario/{id}`

**Respuesta:**
```json
{
    "mensaje": "Usuario eliminado"
}
```

---

### Boleto

#### Obtener todos los boletos
**GET** `/boleto`

**Respuesta:**
```json
[
    {
        "idBoleto": 1,
        "tipo": "VIP",
        "idUsuario": 2
    }
]
```

#### Obtener un boleto por ID
**GET** `/boleto/{id}`

**Respuesta:**
```json
{
    "idBoleto": 1,
    "tipo": "VIP",
    "idUsuario": 2
}
```

#### Crear un boleto
**POST** `/boleto`

**Payload:**
```json
{
    "tipo": "General",
    "idUsuario": 3
}
```

**Respuesta:**
```json
{
    "mensaje": "Boleto creado"
}
```

#### Actualizar un boleto
**PUT** `/boleto/{id}`

**Payload:**
```json
{
    "tipo": "Platino",
    "idUsuario": 1
}
```

**Respuesta:**
```json
{
    "mensaje": "Boleto actualizado"
}
```

#### Eliminar un boleto
**DELETE** `/boleto/{id}`

**Respuesta:**
```json
{
    "mensaje": "Boleto eliminado"
}
```

---

### Evento

#### Obtener todos los eventos
**GET** `/evento`

**Respuesta:**
```json
[
    {
        "idEvento": 1,
        "fechaInicio": "2024-06-01",
        "fechaFinal": "2024-06-05"
    }
]
```

#### Obtener un evento por ID
**GET** `/evento/{id}`

**Respuesta:**
```json
{
    "idEvento": 1,
    "fechaInicio": "2024-06-01",
    "fechaFinal": "2024-06-05"
}
```

#### Crear un evento
**POST** `/evento`

**Payload:**
```json
{
    "fechaInicio": "2024-07-10",
    "fechaFinal": "2024-07-15"
}
```

**Respuesta:**
```json
{
    "mensaje": "Evento creado"
}
```

#### Actualizar un evento
**PUT** `/evento/{id}`

**Payload:**
```json
{
    "fechaInicio": "2024-08-01",
    "fechaFinal": "2024-08-05"
}
```

**Respuesta:**
```json
{
    "mensaje": "Evento actualizado"
}
```

#### Eliminar un evento
**DELETE** `/evento/{id}`

**Respuesta:**
```json
{
    "mensaje": "Evento eliminado"
}
```

---

## Notas adicionales
- Todas las respuestas siguen el formato JSON.
- En los métodos `POST` y `PUT`, se deben enviar los datos en formato JSON en el cuerpo de la solicitud.
- Las claves primarias (`idUsuario`, `idBoleto`, `idEvento`, etc.) deben ser valores enteros.
- Se recomienda manejar los errores y validar las respuestas del API en el cliente.

## Autenticación y Seguridad
Este servicio no cuenta con autenticación ni autorización implementadas. Se recomienda integrar JWT o alguna otra estrategia de autenticación para su uso en producción.

