const entryAuthors = require("../models/authors.model");

const getAuthor = async (req, res) => {
    let author;
    try {
        if (req.query.email) {
            author = await entryAuthors.getAuthorByEmail(req.query.email);
        }
        else {
            author = await entryAuthors.getAuthors();
        }
        res.status(200).json(author); // [] con los author encontradas
    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Error del servidor" })
    }
}

const createAuthor = async (req, res) => {
    try {

        const { name,surname,email,image } = req.body;

        if (!name || !surname || !email) {
            return res.status(400).json({
                "message": `Faltan datos: debe haber name, surname, email`
            });
        }

        await entryAuthors.createAuthor(name,surname,email,image)

        res.status(201).json({
            "message": `usuario creado: ${email}`
        });


    }catch (error) {
        console.error(error);
        if (error.code === '23505') {
            return res.status(409).json({
                success: false,
                Error: "409 Conflict ya existe un author con este email"
            })
        }
        res.status(500).json({
            Error: "Error del servidor"
        })
    }
}

const updateAuthor = async (req, res) => {
    try {
        const {name, surname, new_email, image, email} = req.body;

        if (!name || !surname || !email || !new_email || !image) {
            return res.status(400).json({
                "message": `Faltan Datos: debe haber name, surname, email, image y new_email`
            });
        }

        const response = await entryAuthors.updateAuthor(name, surname, new_email, image, email)

        if (response === 0) {
            return res.status(404).json({
                "message": `No existe el usuario ${email}`
            });
        }

        res.status(200).json({
            "message": `usuario actualizado: ${new_email}`
        });

    } catch (error) {
        console.error(error);
        if (error.code === '23505') {
            return res.status(409).json({
                success: false,
                Error: "409 Conflict ya existe un author con este email"
            })
        }
        res.status(500).json({
            Error: "Error del servidor"
        })
    }
}

const deleteAuthor = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                "message": `Faltan datos: debe haber un email`
            });
        }

        const response = await entryAuthors.deleteAuthor(email)

        if (response === 0) {
            return res.status(404).json({
                "message": `No existe el email ${email}`
            });
        }

        res.status(200).json({
            "message": `Se ha borrado ${email}`
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Error del servidor" })
    }
}

module.exports = {
    getAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor
}