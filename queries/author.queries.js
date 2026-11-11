const queriesAuthor = {
    getAuthors: `SELECT  * FROM authors`,

    getAuthorByEmail: `SELECT *
    FROM authors a
    WHERE a.email = $1;`,

    createAuthor: `INSERT INTO authors(name,surname,email,image)
                        VALUES ($1,$2, $3 ,$4)`,

    updateAuthor: `UPDATE authors
              SET name = $1,
                  surname = $2,
                  email = $3,
                  image = $4
                  WHERE email = $5`,


    deleteAuthor: `DELETE  
                FROM authors WHERE email=$1`,

    createTable: `CREATE TABLE IF NOT EXISTS authors (
                id_author serial NOT NULL PRIMARY KEY, 
                name varchar(45) NOT NULL, 
                surname varchar(45) NOT NULL, 
                email varchar(100) NOT NULL UNIQUE,
                image varchar(255)
                );`,

    dropTable : `DROP TABLE IF EXISTS authors`
    
}

module.exports = queriesAuthor