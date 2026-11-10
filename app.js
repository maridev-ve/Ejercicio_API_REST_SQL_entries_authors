//Variables de entorno
require('dotenv').config()

//importar el modulo
const express = require("express")

//crear el objeto servidor (vacio)
const app = express();

//puerto
const port = 3000;


//Rutas
const entriesRoutes = require( './routes/entries.routes');
//const authorsRoutes = require('./routes/authors.routes');

//Convertir a json los datos recibidos
app.use(express.json())

// http://localhost:3000/
app.get("/", (req, res) => {
  res.send("Hello Mariela!");
});

// http://localhost:3000/api/entries
app.use('/api/entries', entriesRoutes)
//app.use('/api/authors', authorsRoutes);


app.listen( port, () =>{
    console.log(`Example app listening on http://localhost:${port}`)
} )