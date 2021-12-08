const express = require('express')
const app = express()

const apiRouter = require("./routers/api.js")

app.use(express.urlencoded({ extended: true }));

require('./db')

app.use('/api', apiRouter)

app.listen(3000, () => {
    console.log("Server ON")
})