// Require
const express = require('express')
const router = express.Router()
const ClienteController = require('../controllers/ClienteController')

// routes
router.get('/api/getClientes', ClienteController.getAllClientes)
router.get('/api/getCliente/:id', ClienteController.getClienteById)
router.post('/api/postCliente', ClienteController.postCliente)
router.put('/api/putCliente/:id', ClienteController.putCliente)
router.delete('/api/removeCliente/:id', ClienteController.deleteCliente)

module.exports = router