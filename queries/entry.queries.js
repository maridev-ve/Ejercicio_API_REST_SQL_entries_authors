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

createEntry:   `INSERT INTO entries(title,content,id_author,category)
                        VALUES ($1,$2,
                        (SELECT id_author FROM authors WHERE email=$3),$4)`
}


module.exports = queries