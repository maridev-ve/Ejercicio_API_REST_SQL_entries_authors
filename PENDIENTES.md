# Tareas pendientes

## 0. Preparar el otro ordenador (después de clonar)

- [ ] `git clone <url-del-repo>` (o `git pull` si ya estaba clonado)
- [ ] `npm install` → regenera `node_modules` (no está en git)
- [ ] Copiar `.env.example` como `.env` y rellenar `DB_HOST`, `DB_USER`, `DB_DATABASE`, `DB_PORT`, `DB_PASSWORD`
- [ ] Base de datos (elegir una):
  - **Local**: instalar PostgreSQL, ejecutar `queries.sql` y aplicar el `UNIQUE` de `title` (`unique_title.sql`, paso "Sexto")
  - **Render** (recomendado, se hace igual para entregar): crear la BBDD en Render, ejecutar ahí `queries.sql` + `UNIQUE`, y poner sus datos en el `.env`
- [ ] Arrancar el servidor y probar `GET /api/entries` en Postman para confirmar que conecta

## 1. Queries de authors (`queries/author.queries.js`)

Mismo formato que `entry.queries.js` (objeto exportado).

- [ ] getAll: todos los autores
- [ ] getByEmail: un autor por email (en el model devolver un objeto, no el array)
- [ ] create: ¿qué columnas metes tú y cuál pone Postgres?
- [ ] update: todo llega en el body, `WHERE` por email. Revisar el orden de `$1, $2…` frente al array
- [ ] delete: por email

## 2. Model, controller y router de authors

- [ ] `models/authors.model.js`
- [ ] `controllers/authors.controller.js`. Mensajes del README:
  - POST → 201 `{message: "usuario creado: <email>"}`
  - PUT → 200 `{message: "usuario actualizado: <email>"}`
  - DELETE → 200 `{message: "Se ha borrado <email>"}`
  - Validación 400 (faltan datos) y 404 (no existe), como en entries
- [ ] `routes/authors.routes.js`
- [ ] Descomentar el `require` y el `app.use('/api/authors', ...)` en `app.js`

## 3. Errores de la base de datos en el `catch`

- [ ] Duplicado (código `23505`, por el `UNIQUE`) → responder **409 Conflict**
  - En `createEntry` y `updateEntry` (ahora un título repetido da 500)
  - En crear/actualizar author (email repetido)
- [ ] Borrar autor con entries (código `23503`, por la foreign key) → **409** con mensaje claro
  - Decidido: mantener el bloqueo (no CASCADE)
  - Probar: borrar un autor nuevo sin entries (OK) y borrar a Alejandru (409)

## 4. Queries CREATE / DROP

- [ ] Añadir `CREATE TABLE` y `DROP TABLE` de las dos tablas a los archivos de queries

## 5. Morgan

- [ ] Instalar Morgan y usarlo como middleware en `app.js`

## 6. Despliegue

- [ ] BBDD en Render (activar SSL en el `Pool` de `config/db_pgsql.js`)
- [ ] Servidor en Render:
  - puerto con `process.env.PORT`
  - script `start` con `node`, no con `nodemon`
  - variables de entorno en el dashboard (el `.env` no se sube)

## 7. Entrega

- [ ] Poner en el README el link del repo y el de la API desplegada
- [ ] Entregar
