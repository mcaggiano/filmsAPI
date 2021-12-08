const router = require('express').Router()
const bcrypt = require('bcrypt')

const jwt = require('jwt-simple')
const moment = require('moment')

const checkUserCreate = require('../../middlewares/checkUserCreate')
const { User } = require("../../db")
const { check, validationResult } = require('express-validator')

router.post('/register', [
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('email', 'Debes registrar un email válido').isEmail(),
    check('password', 'La contraseña debe tener mínimo 6 carácteres').isLength({ min: 6})
], checkUserCreate, async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array()})
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10)
    const user = await User.create(req.body)
    res.json(user)
})

router.post('/login', async (req, res) => {
    const user = await User.findOne( {where: {email:  req.body.email }})

    if(user) {
        const passwordCompare = bcrypt.compareSync(req.body.password, user.password)
        if(passwordCompare) {
            res.json({success: createToken(user)})
        } else {
            res.json("Credenciales inválidas")
        }
    } else {
        res.json("Credenciales inválidas")
    }
})

const createToken = (user) => {
    const payload = {
        user_id: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(5, 'minutes').unix()      
    }
    return jwt.encode(payload, 'secret')
}
module.exports = router