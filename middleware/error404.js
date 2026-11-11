//Cuando lo que busquen no esta en niguna de las rutas que tengo entra aqui
const error404 = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "404 not found"
  })
}

module.exports = error404
