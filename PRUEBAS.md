# Pruebas de la API

API desplegada: https://api-rest-sql-entries-authors-15yv.onrender.com

Copia cada URL en Postman con el método indicado. En POST, PUT y DELETE: **Body → raw → JSON** y pega el JSON.

Hazlas **en orden**: se crea un autor y una entry de prueba, se modifican y al final se borran, así la base de datos queda como estaba.

> El plan gratuito de Render se duerme tras 15 min sin uso: la primera petición puede tardar ~1 minuto.

## 1. GET (lectura y validación de ?email)

### 1. Raíz de la API

**GET**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/
```

**Esperado: 200**. Comprueba que el servidor responde.

### 2. Todas las entries

**GET**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/entries
```

**Esperado: 200**. Devuelve todas las entries con los datos de su autor (JOIN).

### 3. Entries de un autor (?email)

**GET**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/entries?email=birja@thebridgeschool.es
```

**Esperado: 200**. Devuelve solo las entries del autor con ese email.

### 4. Entries con email inválido → 400

**GET**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/entries?email=hola
```

**Esperado: 400**. Validación (express-validator, query): si se envía ?email debe tener formato de email y máx. 100 caracteres. Si no se envía, es opcional.

### 5. Todos los autores

**GET**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/authors
```

**Esperado: 200**. Devuelve todos los autores.

### 6. Un autor por email (?email)

**GET**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/authors?email=birja@thebridgeschool.es
```

**Esperado: 200**. Devuelve el autor con ese email.

### 7. Autores con email inválido → 400

**GET**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/authors?email=hola
```

**Esperado: 400**. Validación (query): formato de email.

### 8. Ruta inexistente → 404

**GET**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/ruta-que-no-existe
```

**Esperado: 404**. Middleware error404: cualquier ruta no definida responde 404.

## 2. Authors - crear (POST)

### 9. Crear autor → 201

**POST**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/authors
```

```json
{"name": "Prueba", "surname": "Postman", "email": "prueba.postman@thebridgeschool.es", "image": "https://randomuser.me/api/portraits/lego/1.jpg"}
```

**Esperado: 201**. Crea el autor de prueba que usarán las siguientes peticiones.

Validaciones del POST:
- name: obligatorio, texto, 3-45 caracteres
- surname: obligatorio, texto, 3-45 caracteres
- email: formato email, máx. 100 caracteres

### 10. Crear autor duplicado → 409

**POST**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/authors
```

```json
{"name": "Prueba", "surname": "Postman", "email": "prueba.postman@thebridgeschool.es", "image": "https://randomuser.me/api/portraits/lego/1.jpg"}
```

**Esperado: 409**. El email es UNIQUE en la BBDD: PostgreSQL devuelve el código 23505 y la API responde 409 Conflict.

### 11. Crear autor con datos inválidos → 400

**POST**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/authors
```

```json
{"name": "", "surname": "Re", "email": "noesunemail"}
```

**Esperado: 400**. Devuelve la lista de errores de validación: name vacío, surname con menos de 3 caracteres y email con formato inválido.

## 3. Entries - CRUD completo

### 12. Crear entry → 201

**POST**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/entries
```

```json
{"title": "Entry de prueba Postman", "content": "Contenido de la entry creada desde Postman", "email": "prueba.postman@thebridgeschool.es", "category": "Pruebas"}
```

**Esperado: 201**. Validaciones del POST:
- title: obligatorio, texto, 3-100 caracteres
- content: obligatorio, texto, mín. 10 caracteres
- email: formato email (debe ser de un autor existente)
- category: obligatoria, texto, 5-15 caracteres

### 13. Crear entry con título duplicado → 409

**POST**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/entries
```

```json
{"title": "Entry de prueba Postman", "content": "Contenido de la entry creada desde Postman", "email": "prueba.postman@thebridgeschool.es", "category": "Pruebas"}
```

**Esperado: 409**. El título es UNIQUE en la BBDD → 409 Conflict.

### 14. Crear entry con autor inexistente → 404

**POST**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/entries
```

```json
{"title": "Esta entry no debería crearse", "content": "Contenido de prueba suficientemente largo", "email": "noexiste@thebridgeschool.es", "category": "Pruebas"}
```

**Esperado: 404**. Antes de insertar se comprueba que el email corresponde a un autor existente. Si no, 404 y no se toca la BBDD.

### 15. Crear entry con datos inválidos → 400

**POST**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/entries
```

```json
{"title": "", "content": "corto", "email": "malo", "category": "Categoria demasiado larga"}
```

**Esperado: 400**. Errores: title demasiado corto, content con menos de 10 caracteres, email inválido y category con más de 15 caracteres.

### 16. Modificar entry con datos inválidos → 400

**PUT**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/entries
```

```json
{"title": "Entry de prueba Postman", "new_title": "", "content": "corto", "email": "malo", "category": "abc"}
```

**Esperado: 400**. Validaciones del PUT:
- title (entry a modificar): obligatorio, texto, 3-100
- new_title: obligatorio, texto, 3-100
- content: obligatorio, mín. 10
- email: formato email (autor existente)
- category: obligatoria, 5-15

### 17. Modificar entry inexistente → 404

**PUT**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/entries
```

```json
{"title": "Titulo que no existe", "new_title": "Otro titulo", "content": "Contenido de prueba suficientemente largo", "email": "prueba.postman@thebridgeschool.es", "category": "Pruebas"}
```

**Esperado: 404**. No hay ninguna entry con ese title.

### 18. Modificar entry con autor inexistente → 404

**PUT**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/entries
```

```json
{"title": "Entry de prueba Postman", "new_title": "Entry de prueba Postman modificada", "content": "Contenido de prueba suficientemente largo", "email": "noexiste@thebridgeschool.es", "category": "Pruebas"}
```

**Esperado: 404**. El email no corresponde a ningún autor: 404 y la entry no se modifica.

### 19. Modificar entry con new_title ya existente → 409

**PUT**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/entries
```

```json
{"title": "Entry de prueba Postman", "new_title": "Noticia: SOL en Madrid", "content": "Contenido de prueba suficientemente largo", "email": "prueba.postman@thebridgeschool.es", "category": "Pruebas"}
```

**Esperado: 409**. Ya existe otra entry con ese título (UNIQUE) → 409.

### 20. Modificar entry → 200

**PUT**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/entries
```

```json
{"title": "Entry de prueba Postman", "new_title": "Entry de prueba Postman modificada", "content": "Contenido modificado desde Postman", "email": "prueba.postman@thebridgeschool.es", "category": "Modificada"}
```

**Esperado: 200**. Modifica la entry buscándola por title.

### 21. Borrar entry sin título → 400

**DELETE**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/entries
```

```json
{}
```

**Esperado: 400**. Validación del DELETE: title obligatorio, texto, máx. 100 caracteres.

### 22. Borrar entry → 200

**DELETE**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/entries
```

```json
{"title": "Entry de prueba Postman modificada"}
```

**Esperado: 200**. Borra la entry buscándola por title.

### 23. Borrar entry ya borrada → 404

**DELETE**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/entries
```

```json
{"title": "Entry de prueba Postman modificada"}
```

**Esperado: 404**. La entry ya no existe.

## 4. Authors - modificar y borrar (PUT / DELETE)

### 24. Modificar autor con datos inválidos → 400

**PUT**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/authors
```

```json
{"name": "", "surname": "Re", "email": "prueba.postman@thebridgeschool.es", "new_email": "noesunemail", "image": "noesunaurl"}
```

**Esperado: 400**. Validaciones del PUT:
- name, surname: obligatorios, texto, 3-45
- email (autor a modificar): formato email, máx. 100
- new_email: obligatorio, formato email, máx. 100
- image: obligatoria, URL válida, máx. 255 caracteres

### 25. Modificar autor inexistente → 404

**PUT**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/authors
```

```json
{"name": "Prueba", "surname": "Postman", "email": "noexiste@thebridgeschool.es", "new_email": "otro@thebridgeschool.es", "image": "https://randomuser.me/api/portraits/lego/2.jpg"}
```

**Esperado: 404**. No hay ningún autor con ese email.

### 26. Modificar autor con new_email ya existente → 409

**PUT**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/authors
```

```json
{"name": "Prueba", "surname": "Postman", "email": "prueba.postman@thebridgeschool.es", "new_email": "birja@thebridgeschool.es", "image": "https://randomuser.me/api/portraits/lego/2.jpg"}
```

**Esperado: 409**. El nuevo email ya pertenece a otro autor (UNIQUE) → 409.

### 27. Modificar autor → 200

**PUT**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/authors
```

```json
{"name": "Prueba2", "surname": "Postman2", "email": "prueba.postman@thebridgeschool.es", "new_email": "prueba.postman2@thebridgeschool.es", "image": "https://randomuser.me/api/portraits/lego/2.jpg"}
```

**Esperado: 200**. Modifica el autor buscándolo por email.

### 28. Borrar autor con email inválido → 400

**DELETE**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/authors
```

```json
{"email": "noesunemail"}
```

**Esperado: 400**. Validación del DELETE: email obligatorio, formato email, máx. 100 caracteres.

### 29. Borrar autor → 200

**DELETE**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/authors
```

```json
{"email": "prueba.postman2@thebridgeschool.es"}
```

**Esperado: 200**. Borra el autor (sus entries se borrarían también por ON DELETE CASCADE).

### 30. Borrar autor ya borrado → 404

**DELETE**

```
https://api-rest-sql-entries-authors-15yv.onrender.com/api/authors
```

```json
{"email": "prueba.postman2@thebridgeschool.es"}
```

**Esperado: 404**. El autor ya no existe.
