// Require
const ClienteModel = require("../models/ClienteModel");

// Config Routes

// Read All
exports.getAllClientes = async (req, res) => {
    try {
        const clientes = await ClienteModel.find({})
        res.send(clientes)
    } catch (err) {
        res.status(400).send({ mensagem: "getAllClientes - Erro ao consultar os clientes" });
    }
};

// Read one by Id
exports.getClienteById = async (req, res) => {
    try {
        const {id} = req.params
        const cliente = await ClienteModel.find({_id: id})
        res.send(cliente)
    } catch (err) {
        res.status(400).send({ mensagem: "getClienteById - Erro ao consultar o cliente" });
    }
}

// Create
exports.postCliente = async (req, res) => {
    try {
        const cliente = await ClienteModel.create(req.body)
        res.status(200).send({mensagem: 'Cliente cadastrado com sucesso'})
    } catch (err) {
        res.status(400).send({ mensagem: "postCliente - Erro ao cadastrar o cliente" });
    }
}

// Update
exports.putCliente = async (req, res) => {
    try {
        const {id} = req.params
        await ClienteModel.updateOne({_id: id}, req.body)
        res.status(200).send({mensagem: 'Cliente atualizado com sucesso'})
    } catch (err) {
        res.status(400).send({ mensagem: "putCliente - Erro ao atualizar o cliente" });
    }
}

// Delete
exports.deleteCliente = async (req, res) => {
    try {
        const {id} = req.params
        await ClienteModel.deleteOne({_id: id})
        res.status(200).send({mensagem: 'Cliente removido com sucesso'})
    } catch (err) {
        res.status(400).send({ mensagem: "putCliente - Erro ao atualizar o cliente" });
    }
}