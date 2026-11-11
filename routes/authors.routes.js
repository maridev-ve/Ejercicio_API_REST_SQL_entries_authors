const express = require('express')

//Rutas
const authorController = require("../controllers/authors.controller")
//"mini-app" vacío donde voy a guardar las rutas
const router = express.Router();

//Middlewares
const checkValidation = require( "../middleware/checkValidation" )

//Validator
const {validateCreateAuthors, validateUpdateAuthors, validateGetByEmail, validateDeleteAuthor} = require( "../validators/validators" )


router.get('/', validateGetByEmail, checkValidation, authorController.getAuthor)

router.post('/', validateCreateAuthors, checkValidation,  authorController.createAuthor )

router.put('/', validateUpdateAuthors, checkValidation, authorController.updateAuthor)

router.delete('/', validateDeleteAuthor, checkValidation, authorController.deleteAuthor)


module.exports = router;