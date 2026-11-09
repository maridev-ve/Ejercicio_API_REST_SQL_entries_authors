//objeto de coneccion a la base de datos
const pool = require("../config/db_pgsql");

//importar las queries
const queries = require("../queries/entry.queries");


const getAllEntries = async () => {
    let client, result;
    try {
        client = await pool.connect();
        result = await client.query(queries.getAllEntries)
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

const getEntriesByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        result = await client.query(queries.getEntriesByEmail, [email])
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

const createEntry = async (title, content, email, category) => {
    let client, result;
    try {
        client = await pool.connect();
        result = await client.query(queries.createEntry, [title, content, email, category])
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
    getAllEntries,
    getEntriesByEmail,
    createEntry
}