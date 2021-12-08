const router = require('express').Router()

const apiFilmsRouter = require("./api/films")
const apiUsersRouter = require("./api/users")

const checkToken = require("../middlewares/checkToken")

router.use('/films', checkToken, apiFilmsRouter)

router.use('/users', apiUsersRouter)

module.exports = router