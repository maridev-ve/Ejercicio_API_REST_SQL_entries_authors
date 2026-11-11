const express = require('express')

//Rutas
const entriesController = require("../controllers/entries.controller")
//"mini-app" vacío donde voy a guardar las rutas de entries
const router = express.Router();

//Middlewares
const checkValidation = require( "../middleware/checkValidation" )

//validator
const {validateCreateEntry, validateUpdateEntry, validateDeleteEntry, validateGetByEmail} = require( "../validators/validators" )


router.get('/',validateGetByEmail, checkValidation, entriesController.getEntries)

router.post('/', validateCreateEntry, checkValidation, entriesController.createEntry )

router.put('/',validateUpdateEntry, checkValidation, entriesController.updateEntry)

router.delete('/', validateDeleteEntry ,checkValidation, entriesController.deleteEntry)


module.exports = router;