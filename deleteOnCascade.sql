--Primero: busco el nombre de la CONSTRAINT entries_id_author_fkey

--Borrar y agregar CONSTRAINT para que permita borrar en cascada

ALTER Table entries DROP constraint entries_id_author_fkey,

ADD CONSTRAINT entries_id_author_fkey FOREIGN KEY (id_author) REFERENCES authors(id_author) ON DELETE CASCADE;

