const express = require ('express')
const router = express.Router()
const Cliente = require ("../models/cliente")

//localhost:3000/api/clientes
router.get('', (req, res) => {
    Cliente.find().then(documents => {
        console.log(documents)
        res.status(200).json({
            mensagem: "Tudo OK",
            clientes: documents
        })
    })
})

router.get('/:id', (req, res) => {
    //req.params.id {id: 123456}
    Cliente.findById(req.params.id).then(cli => {
        if (cli)
            res.status(200).json(cli)
        else
            res.status(404).json({mensagem: "Cliente não encontrado!"})
    })
})

router.put('/:id', (req, res) => {
    const cliente = new Cliente({
        ...req.body,
        _id: req.params.id
    })
    Cliente.updateOne(
        {_id: req.params.id },
        cliente
    )
    .then(mongoResponse => {
        console.log(mongoResponse)
        res.status(200).json({
            mensagem: 'Atualização realizada com sucesso'
        })
    })
})

//localhost:3000/api/clientes
router.post('', (req, res) => {
    //construir um objeto do tipo Cliente com os dados vindos da requisição
    const cliente = new Cliente({
        nome: req.body.nome,
        fone: req.body.fone,
        email: req.body.email
    })
    //exibir com um log
    console.log(cliente)
    //armazenar no mongodb
    cliente.save().then((clienteInserido) => {
        res.status(201).json({
            mensagem: 'Cliente inserido',
            id: clienteInserido._id
        })
    })
})

//localhost:3000/api/clientes/123456
router.delete("/:id", (req, res) => {
    Cliente.deleteOne({_id: req.params.id})
    .then((resultado) => {
        console.log(resultado)
        res.status(200).end()    
    })
})

module.exports = router