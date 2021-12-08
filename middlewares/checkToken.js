const jwt = require('jwt-simple')
const moment = require('moment')

const checkToken = (req, res, next) => {
    if(!req.headers['user-token']) {
        res.json({error : "Necesitas incluir el user-token en la cabecera"})
    }

    const userToken = req.headers['user-token']
    let payload = {}

    try {
        payload = jwt.decode(userToken, 'secret')
    } catch(err) {
        return res.json({error: 'El token es incorrecto'})
    }

    if(payload.expiredAt < moment().unix()) {
        return res.json({error: 'El token ha expirado'})
    }

    req.user_id = payload.user_id

    next();
}

module.exports = checkToken