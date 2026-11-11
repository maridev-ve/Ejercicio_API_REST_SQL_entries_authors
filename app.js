//Variables de entorno
require('dotenv').config()


//importar el modulo
const express = require("express")
const helmet = require("helmet")


//Middlewares
const morgan = require("./middleware/morgan");
const error404 = require("./middleware/error404")


//crear el objeto servidor (vacio)
const app = express();

//puerto con Render y si no hay 3000
const port = process.env.PORT || 3000;

//Securizar la API con helmet
app.use(helmet());


 /* Activamos Morgan como middleware. El texto entre comillas define qué se verá en consola:
 [:date[iso]] -> Fecha y hora exacta en formato estándar
 :method      -> Verbo HTTP (GET, POST, PUT, DELETE...)
 :clean-url   -> Nuestro token personalizado que muestra la ruta ocultando la API_KEY
 :status      -> Código de respuesta HTTP (200 OK, 404 Not Found, 500 Error...)
 :body        -> Nuestro token personalizado con los datos enviados en el JSON */
app.use(morgan('[:date[iso]] :method :clean-url :status - :body'));


//Rutas
const entriesRoutes = require( './routes/entries.routes');
const authorsRoutes = require('./routes/authors.routes');


//Convertir a json los datos recibidos
app.use(express.json())

// http://localhost:3000/
app.get("/", (req, res) => {
  res.send("Hello Mariela!");
});

// http://localhost:3000/api/entries
app.use('/api/entries', entriesRoutes)
//Prueba entries
/* {
    "title": "Amanece Madrid lleno de arena",
    "new_title": "prueba titulo",
    "content": "contenido sin sentido",
    "email": "birja@thebridgeschool.es"
} */

    
// http://localhost:3000/api/authors
app.use('/api/authors', authorsRoutes);


//PRUEBAS
/* POST{
  "name": "Prueba",
  "surname": "Test",
  "email": "prueba@test.com",
  "image": "https://randomuser.me/api/portraits/lego/1.jpg"
},

PUT{
  "name": "Prueba2",
  "surname": "Test2",
  "email": "prueba@test.com",
  "new_email": "prueba2@test.com",
  "image": "https://randomuser.me/api/portraits/lego/2.jpg"
}
  

DELETE { "email": "prueba2@test.com" }
 */


//Middleware para ruta no encontrada
app.use(error404);


app.listen( port, () =>{
    console.log(`Example app listening on http://localhost:${port}`)
} )