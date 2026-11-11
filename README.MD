# API REST de entries y authors

API REST hecha con **Node.js, Express y PostgreSQL** para gestionar las entradas (*entries*) de un blog y sus autores (*authors*). Permite consultar, crear, modificar y borrar los dos recursos, valida los datos que recibe y está desplegada en Render.

- **API desplegada:** https://api-rest-sql-entries-authors-15yv.onrender.com
- **Repositorio:** https://github.com/maridev-ve/Ejercicio_API_REST_SQL_entries_authors

> La API está en el plan gratuito de Render, que se duerme tras 15 minutos sin uso. La primera petición puede tardar hasta un minuto en responder; las siguientes son inmediatas.

---

## Qué incluye

- CRUD completo de **entries** (buscando por título) y de **authors** (buscando por email).
- Las entries se devuelven con los datos de su autor (nombre, apellido, email e imagen).
- **Validación** de todos los datos de entrada con `express-validator`: si algo no es válido, responde `400` con la lista de errores.
- **Errores controlados**: `404` si lo que se busca no existe, `409` si se intenta duplicar un título o un email.
- No se puede crear ni modificar una entry con un autor que no existe.
- Títulos de entries únicos: se añadió `UNIQUE` a la columna `title` tras limpiar los duplicados ([`unique_title.sql`](./unique_title.sql)).
- Si se borra un autor, se borran también sus entries: se cambió la clave foránea a `ON DELETE CASCADE` ([`deleteOnCascade.sql`](./deleteOnCascade.sql)).
- Middlewares: **Helmet** (cabeceras de seguridad) y **Morgan** (registro de peticiones en consola).
- Despliegue de la base de datos y del servidor en **Render**.

---

## Cómo probarla

Hay dos formas, las dos listas para usar contra la API desplegada:

1. **[PRUEBAS.md](./PRUEBAS.md)**: 30 peticiones con la URL completa y el JSON del body, para copiar y pegar en Postman. Cada una indica qué respuesta se espera y qué validación comprueba.
2. **Colección de Postman** en [`postman/`](./postman/entries-authors.postman_collection.json): se importa en Postman (*Import*) y se ejecuta entera con *Run collection*. Cada petición comprueba sola su código de respuesta.

Las pruebas crean un autor y una entry de prueba y los borran al final, así que la base de datos queda como estaba. Hay que hacerlas **en orden**.

---

## Endpoints

URL base: `https://api-rest-sql-entries-authors-15yv.onrender.com`

En las peticiones con body hay que enviar JSON (`Content-Type: application/json`).

### Entries — `/api/entries`

| Método | Ruta | Body | Respuesta correcta |
|---|---|---|---|
| GET | `/api/entries` | — | `200` lista de todas las entries |
| GET | `/api/entries?email=<email>` | — | `200` entries de ese autor |
| POST | `/api/entries` | `title`, `content`, `email`, `category` | `201` `{ "message": "Se ha creado la entry <title>" }` |
| PUT | `/api/entries` | `title` (la entry a modificar), `new_title`, `content`, `email`, `category` | `200` `{ "message": "Se ha modificado la entry <new_title>" }` |
| DELETE | `/api/entries` | `title` | `200` `{ "message": "Se ha borrado la entry <title>" }` |

Ejemplo de entry devuelta por los GET:

```json
{
  "title": "Noticia: SOL en Madrid",
  "content": "Contenido noticia 1",
  "date": "2026-11-11T00:00:00.000Z",
  "category": "Tiempo",
  "name": "Alejandru",
  "surname": "Regex",
  "email_author": "alejandru@thebridgeschool.es",
  "image": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
}
```

Ejemplo de body para crear una entry:

```json
{
  "title": "Mi primera entry",
  "content": "Contenido de la entry de ejemplo",
  "email": "birja@thebridgeschool.es",
  "category": "Sucesos"
}
```

### Authors — `/api/authors`

| Método | Ruta | Body | Respuesta correcta |
|---|---|---|---|
| GET | `/api/authors` | — | `200` lista de todos los autores |
| GET | `/api/authors?email=<email>` | — | `200` datos de ese autor |
| POST | `/api/authors` | `name`, `surname`, `email`, `image` | `201` `{ "message": "usuario creado: <email>" }` |
| PUT | `/api/authors` | `email` (el autor a modificar), `new_email`, `name`, `surname`, `image` | `200` `{ "message": "usuario actualizado: <new_email>" }` |
| DELETE | `/api/authors` | `email` | `200` `{ "message": "Se ha borrado <email>" }` |

Ejemplo de body para crear un autor:

```json
{
  "name": "Guillermu",
  "surname": "Develaweyer",
  "email": "guillermu@thebridgeschool.es",
  "image": "https://randomuser.me/api/portraits/thumb/men/34.jpg"
}
```

---

## Validaciones

| Campo | Regla |
|---|---|
| `name`, `surname` | obligatorios, texto, entre 3 y 45 caracteres |
| `email`, `new_email` | formato de email, máximo 100 caracteres |
| `image` (PUT de authors) | obligatoria, URL válida, máximo 255 caracteres |
| `title`, `new_title` | obligatorios, texto, entre 3 y 100 caracteres |
| `content` | obligatorio, texto, mínimo 10 caracteres |
| `category` | obligatoria, texto, entre 5 y 15 caracteres |
| `?email` en los GET | opcional; si se envía, debe ser un email válido |

Los límites máximos coinciden con los de las columnas de la base de datos, para que un dato demasiado largo dé un `400` claro en vez de un error del servidor.

Cuando la validación falla, la respuesta es un `400` con este formato:

```json
{
  "errors": [
    { "type": "field", "value": "hola", "msg": "Provide valid email", "path": "email", "location": "body" }
  ]
}
```

## Códigos de respuesta

| Código | Cuándo |
|---|---|
| `200` | Consulta, modificación o borrado correctos |
| `201` | Creación correcta |
| `400` | Datos que no pasan la validación |
| `404` | La entry, el autor o la ruta no existen |
| `409` | Ya existe una entry con ese título o un autor con ese email |
| `500` | Error inesperado del servidor |

---

## Ejecutarla en local

Necesitas **Node.js** y **PostgreSQL**.

1. Clonar el repositorio e instalar dependencias:
   ```bash
   git clone https://github.com/maridev-ve/Ejercicio_API_REST_SQL_entries_authors.git
   cd Ejercicio_API_REST_SQL_entries_authors
   npm install
   ```
2. Crear las tablas y los datos de ejemplo ejecutando [`queries.sql`](./queries.sql) en PostgreSQL (por ejemplo, desde pgAdmin).
3. Copiar `.env.example` como `.env` y rellenar los datos de tu base de datos:
   ```
   DB_HOST=localhost
   DB_USER=postgres
   DB_DATABASE=postgres
   DB_PORT=5432
   DB_PASSWORD=tu_contraseña
   DB_SSL=false
   ```
   `DB_SSL` solo va a `true` con bases de datos que exigen conexión cifrada, como la de Render.
4. Arrancar el servidor:
   ```bash
   npm run dev   # con nodemon, se reinicia al guardar cambios
   npm start     # con node, como en producción
   ```
5. La API queda en `http://localhost:3000`. Para usar la colección de Postman en local, cambia su variable `baseUrl` a esa dirección.

---

## Estructura del proyecto

```
app.js                 Servidor Express: middlewares y rutas
config/db_pgsql.js     Conexión a PostgreSQL (Pool, con SSL opcional)
routes/                Rutas de entries y authors
validators/            Reglas de validación (express-validator)
middleware/            checkValidation, error404 y Morgan
controllers/           Reciben la petición y deciden la respuesta
models/                Ejecutan las consultas en la base de datos
queries/               Consultas SQL (incluidas CREATE TABLE y DROP TABLE)
queries.sql            Script para crear las tablas y los datos de ejemplo
unique_title.sql       Pasos para hacer único el título de las entries (limpieza de duplicados + UNIQUE)
deleteOnCascade.sql    Cambio de la clave foránea de entries a ON DELETE CASCADE
PRUEBAS.md / postman/  Pruebas de la API
```

Cada petición sigue este recorrido: **ruta → validación → controller → model → base de datos**.

---

## Tecnologías

Node.js · Express · PostgreSQL (`pg`) · express-validator · Helmet · Morgan · dotenv · nodemon · Render

---

<details>
<summary><strong>Enunciado original del ejercicio</strong></summary>

## EJERCICIO - API REST con Express - Posts del blog

En este ejercicio vamos a trabajar con una base de datos relacional a través de una API REST que desarrollemos, para ello deberemos escribir la lógica necesaria en los archivos ya predefinidos en el repositorio, conectar la base de datos y definir las rutas para interactuar con ella.

A continuación tienes las queries necesarias para el ejercicio, tendrás que ejecutarlas en pgAdmin 4 para crear las tablas e introducir los datos en ellas

[Fichero queries SQL](./queries.sql)


## Tareas a realizar

- Primero, vamos a modificar la BBDD para que no se puedan insertar entries repetidas por título (Hay que alterar algo en la tabla)

- Después, completamos la API con las siguientes rutas para entries:

    - [GET] http://localhost:3000/api/entries Retorna todas las entries
    - [GET] http://localhost:3000/api/entries?email=alejandru@thebridgeschool.es Retorna un objeto con las entries del autor buscado.

    #### Modificar la query SQL para que me devuelva una respuesta con los datos del autor y sin ID de la entry:

```
{
"title": "noticia desde Node",
"content": "va a triunfar esto2",
"date": "2022-03-20T23:00:00.000Z",
"category": "sucesos",
"name": "Alejandru",
"surname": "Regex",
"email_author":"alejandru@thebridgeschool.es"
"image": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
}
```
En vez de esta respuesta, que es la que está ahora:

```
 {
"id_entry": 2,
"title": "Noticia: Un panda suelto por la ciudad",
"content": "El panda se comió todas las frutas de una tienda",
"date": "2022-03-15T23:00:00.000Z",
"id_author": 1,
"category": "Sucesos"
}
```

- [PUT] http://localhost:3000/api/entries/ (parecido a POST) modifica una entry por completo con nuevos datos y retorna un status 200. Buscar por título para editar entry.

Payload:
```
{message: "Se ha modificado la entry 'Título de noticia' "}

```

- [DELETE] http://localhost:3000/api/entries/ Borra una entry y retorna un status 200. Búsqueda por título de entry para borrar. 
Payload: 
```
{message: "Se ha borrado la entry 'Título de noticia' "}
```

#### A continuación, crearemos las rutas para los autores:

 
- [GET] http://localhost:3000/api/authors Retorna un objeto con los datos de todos los autores. Retorna un status 200.

Payload:
```
{
    "id_author": 1,
    "name": "Alejandru",
    "surname": "Regex",
    "email": "alejandru@thebridgeschool.es",
    "image": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
},
{
    ...
}
...
```

- [GET] http://localhost:3000/api/authors?email=alejandru@thebridgeschool.es Retorna un objeto con los datos del autor buscado. Retorna un status 200
Payload:

```
{
    "id_author": 1,
    "name": "Alejandru",
    "surname": "Regex",
    "email": "alejandru@thebridgeschool.es",
    "image": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
}
```

- [POST] http://localhost:3000/api/authors/ Se envía por POST los datos del autor a crear y retorna un status 201. Payload:
```
{message: "usuario creado: guillermu@thebridgeschool.es"}
```

- [PUT] http://localhost:3000/api/authors/ Actualiza los datos de un autor y retorna un status 200. 
Payload: 
```
{message: "usuario actualizado: guillermu@thebridgeschool.es"}
```

- [DELETE] http://localhost:3000/api/authors/ Borra un autor y retorna un status 200. Búsqueda por email. 
Payload: 
```
{message: "Se ha borrado guillermu@thebridgeschool.es"}
```


</details>
