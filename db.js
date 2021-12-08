const Sequelize = require('sequelize')

const FilmModel = require("./models/films")
const UserModel = require("./models/users")

const sequelize = new Sequelize('filmsapi', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    logging: false
})

const Film = FilmModel(sequelize, Sequelize)
const User = UserModel(sequelize, Sequelize)

sequelize.sync({ force: false })
    .then(() => {
        console.log("Tablas sincronizadas")
    })

module.exports = {
    Film,
    User
}

sequelize.authenticate()
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('No se conecto')
  })
