const entry = require("../models/entries.model");

const getEntries = async (req, res) => {
    let entries;
    try{
        if (req.query.email) {
        entries = await entry.getEntriesByEmail(req.query.email);
    }
    else {
        entries = await entry.getAllEntries();
    }
    res.status(200).json(entries); // [] con las entries encontradas
    }catch(error){
        console.error(error);
        res.status(500).json({Error: "Error del servidor"})
    }
}

module.exports = {
    getEntries
}