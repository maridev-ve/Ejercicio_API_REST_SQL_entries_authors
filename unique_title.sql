--para que no se repitan títulos


-- Primero: confirmo datos 
SELECT * FROM public.entries
ORDER BY id_entry ASC ;

--Segundo: Descubro que datos estan repetidos de la columna que quiero que no hayan datos repetidos porque sino me daria error
SELECT title, COUNT(*)
FROM entries
GROUP BY title
HAVING COUNT(*) > 1;

--Tercero: Confirmo los datos repetido y miro el ID mas antiguo
/*Es el original. mi id_entry es serial(tipo de columna de PostgreSQL que pone el número automáticamente):
 cada fila nueva recibe el siguiente número. Así que el id más bajo es la que se creó primero, y las demás son copias que llegaron después. */

SELECT title, id_entry
FROM entries
WHERE title = 'Se acabaron las mandarinas de TB' AND id_entry <> 6;


--Cuarto: DELETE los datos confirmados guiandome por el nombre de title repetido y los ID menos con el que me quiero quedar
DELETE
FROM entries
WHERE title = 'Se acabaron las mandarinas de TB' AND id_entry <> 6;


--Quinto: Vuelvo a lanzar el GROUP BY/HAVING para demostrar que ya no queda ningún dato repetido
SELECT title, COUNT(*)
FROM entries
GROUP BY title
HAVING COUNT(*) > 1;


--Sexto: ADD CONSTRAINT agregamos la restriccion para que no se repitan los title 
ALTER TABLE entries 
ADD CONSTRAINT entries_title_unique UNIQUE (title);


--Probamos que funciona 
INSERT INTO entries(title, content )
VALUES ('Noticia: SOL en Madrid', 'puede ser cualquier texto');
/* : ERROR:  duplicate key value violates unique constraint "entries_title_unique"
Key (title)=(Noticia: SOL en Madrid) already exists. 
SQL state: 23505
Detail: Key (title)=(Noticia: SOL en Madrid) already exists. */


--Ahora hacemos una prueba valida
INSERT INTO entries(title, content )
VALUES ('Noticia: Prueba valida', 'puede ser cualquier texto');
--INSERT 0 1 Query returned successfully in 42 msec.