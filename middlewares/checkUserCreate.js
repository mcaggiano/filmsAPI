const { User } = require('../db')

const checkUserCreate = async (req, res, next) => {
    const userInDB = await User.findOne({ where: {email: req.body.email}})
    if(userInDB) {
        res.json({error: "Este email ya esta registrado"})
    }

    next()
}

module.exports = checkUserCreate