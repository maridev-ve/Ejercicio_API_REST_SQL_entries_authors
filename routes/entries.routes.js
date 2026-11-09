const express = require('express')

//Rutas
const entriesController = require("../controllers/entries.controller")
//"mini-app" vacío donde voy a guardar las rutas de entries
const router = express.Router();


router.get('/', entriesController.getEntries)
router.post('/',entriesController.createEntry )

module.exports = router;