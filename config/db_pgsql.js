//Coneccion a la base de datos

const { Pool } = require("pg");

// importa el .env
require("dotenv").config();
// console.log(process.env);

// Objeto de conexión a la BBDD
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false
});

const comprobarConexion = async () => {
    let connection;
    try {
        // Abrir conexión
        connection = await pool.connect();
        // Lanzar petición SQL
        const result = await connection.query("SELECT now()");
        console.log("Estas conectado a la base de datos: " + result.rows[0].now);

    } catch (err) {
        console.error(err)
    }
    finally {
        if (connection) {
            // Cerrar conexión
            connection.release();
        }
    }
}

comprobarConexion();

module.exports = pool;