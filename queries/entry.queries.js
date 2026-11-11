const queries = {
        getAllEntries: `SELECT  e.title,
        e.content,
        e.date,
        e.category,
        a.name,
        a.surname,
        a.email AS email_author,
        a.image
FROM entries e
JOIN authors a ON e.id_author = a.id_author`,

        getEntriesByEmail: `SELECT  e.title,
        e.content,
        e.date,
        e.category,
        a.name,
        a.surname,
        a.email AS email_author,
        a.image
FROM entries e
JOIN authors a ON e.id_author = a.id_author

WHERE a.email = $1;`,

        createEntry: `INSERT INTO entries(title,content,id_author,category)
                        VALUES ($1,$2,
                        (SELECT id_author FROM authors WHERE email=$3),$4)`,

        updateEntry: `UPDATE entries
              SET title = $1,
                  content = $2,
                  category = $3,
                  id_author = (SELECT id_author FROM authors WHERE email = $4)
              WHERE title = $5`,

        deleteEntry: `DELETE  
                        FROM entries WHERE title=$1`,

        createTable: `CREATE TABLE IF NOT EXISTS entries (
                        id_entry serial NOT NULL PRIMARY KEY, 
                        title varchar(100) NOT NULL UNIQUE, 
                        content text NOT NULL, 
                        date date DEFAULT CURRENT_DATE,
                        id_author int,
                        category varchar(15),
                        FOREIGN KEY (id_author) REFERENCES authors(id_author) ON DELETE CASCADE
                        );`,

    dropTable : `DROP TABLE IF EXISTS entries`
}


module.exports = queries