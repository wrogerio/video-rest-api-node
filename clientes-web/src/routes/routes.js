// require
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('pages/index')
})

router.get('/clientes', (req, res) => {
    res.render('pages/clientes/index')
})

router.get('/clientes/adicionar', (req, res) => {
    res.render('pages/clientes/adicionar')
})

router.get('/clientes/editar/:id', (req, res) => {
    res.render('pages/clientes/editar')
})

module.exports = router