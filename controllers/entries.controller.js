const entry = require("../models/entries.model");

const getEntries = async (req, res) => {
    let entries;
    try {
        if (req.query.email) {
            entries = await entry.getEntriesByEmail(req.query.email);
        }
        else {
            entries = await entry.getAllEntries();
        }
        res.status(200).json(entries); // [] con las entries encontradas
    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Error del servidor" })
    }
}

const createEntry = async (req, res) => {
    try {

        const { title, content, email, category } = req.body;

        if (!title || !content || !email) {
            return res.status(400).json({
                "message": `Faltan datos: debe haber titulo, contenido y email`
            });
        }

        await entry.createEntry(title, content, email, category)

        res.status(201).json({
            "message": `Se ha creado la entry ${title}`
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Error del servidor" })
    }
}

module.exports = {
    getEntries,
    createEntry
}