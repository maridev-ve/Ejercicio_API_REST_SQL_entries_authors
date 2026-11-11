const express = require('express')

//Rutas
const authorController = require("../controllers/authors.controller")
//"mini-app" vacío donde voy a guardar las rutas
const router = express.Router();


router.get('/', authorController.getAuthor)

router.post('/',authorController.createAuthor )

router.put('/',authorController.updateAuthor)

router.delete('/',authorController.deleteAuthor)


module.exports = router;