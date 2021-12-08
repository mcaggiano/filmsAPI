const router = require('express').Router()
const { check, validationResult} = require('express-validator')
const { Film } = require("../../db")

router.get('/', async (req, res) => {
    const films = await Film.findAll()
    res.json(films)
})

router.post('/', [
    check('title', 'La película debe tener un titulo').not().isEmpty(),
    check('description', 'La descripción debe tener entre 10 y 100 carácteres').isLength({max: 100, min: 10}),
    check('scort', 'El campo score no puede estar vacio').not().isEmpty(),
    check('director', 'La pelicula debe tener un director').not().isEmpty().isLength({min: 3, max: 30})
], async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array()})
    }

    const film = await Film.create(req.body)
    res.json(film)
})

router.get('/:filmId', async (req, res) => {
    const film = await Film.findOne({where : {id: req.params.filmId}})
    res.json(film)
    
})


router.put('/:filmId', async (req,res) => {
    await Film.update(req.body, {
        where: { id: req.params.filmId }
    })
    res.json({ success: "Se ha modificado"})
})

router.delete('/:filmId', async (req, res) => {
    await Film.destroy({
        where: {id: req.params.filmId}
    })
    res.json({ success: "Se ha borrado"})
})
module.exports = router