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

const updateEntry = async (req, res) => {
    try {
        const { new_title, content, category, email, title } = req.body;

        if (!title || !new_title || !content || !email) {
            return res.status(400).json({
                "message": `Faltan datos: debe haber titulos, contenido y email`
            });
        }

        const response = await entry.updateEntry(new_title, content, category, email, title)

        if (response === 0) {
            return res.status(404).json({
                "message": `No existe la entry ${title}`
            });
        }

        res.status(200).json({
            "message": `Se ha modificado la entry ${new_title}`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Error del servidor" })
    }
}

const deleteEntry = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                "message": `Faltan datos: debe haber un titulo`
            });
        }

        const response = await entry.deleteEntry(title)

        if (response === 0) {
            return res.status(404).json({
                "message": `No existe la entry ${title}`
            });
        }

        res.status(200).json({
            "message": `Se ha borrado la entry ${title}`
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Error del servidor" })
    }
}

module.exports = {
    getEntries,
    createEntry,
    updateEntry,
    deleteEntry
}