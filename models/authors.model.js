const pool = require("../config/db_pgsql")

const queriesAuthors = require("../queries/author.queries");

const getAuthors = async () => {
    let client, result;
    try {
        client = await pool.connect();
        result = await client.query(queriesAuthors.getAuthors)
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        if (client) {
            // Cerrar conexión
            client.release();
        }
    }
    return result.rows;
}

const getAuthorByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        result = await client.query(queriesAuthors.getAuthorByEmail, [email])
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        if (client) {
            // Cerrar conexión
            client.release();
        }
    }
    return result.rows[0];

}

const createAuthor = async (name,surname,email,image) => {
    let client, result;
    try {
        client = await pool.connect();
        result = await client.query(queriesAuthors.createAuthor, [name,surname,email,image])
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        if (client) {
            // Cerrar conexión
            client.release();
        }
    }
    return result.rowCount; // (cuántas filas se insertaron: aquí 1)

}

const updateAuthor = async (name,surname,new_email,image, email) => {
    let client, result;
    try {
        client = await pool.connect();
        result = await client.query(queriesAuthors.updateAuthor, [ name,surname,new_email,image, email])
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        if (client) {
            // Cerrar conexión
            client.release();
        }
    }
    return result.rowCount;

}


const deleteAuthor = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        result = await client.query(queriesAuthors.deleteAuthor, [email])
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        if (client) {
            // Cerrar conexión
            client.release();
        }
    }
    return result.rowCount;

}

module.exports = {
    getAuthors,
    getAuthorByEmail,
    createAuthor,
    updateAuthor,
    deleteAuthor
}
