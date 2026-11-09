const queries = {
    getAllEntries : `SELECT  e.title,
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

WHERE a.email = $1;`
}

module.exports = queries