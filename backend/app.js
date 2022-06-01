require('dotenv').config()
const express = require ('express')
const cors = require ('cors')
const app = express()
const mongoose = require('mongoose')
const Cliente = require ("./models/cliente")

const {
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_HOST,
    MONGODB_CLUSTER,
    MONGODB_DATABASE
} = process.env

mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.${MONGODB_HOST}.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`)
.then(() => {
    console.log("Conexão OK")
})
.catch((e) => {
    console.log("Conexão NOK" + e)
})

app.use(cors())
//req.body pode ser tratado como um objeto JSON
app.use(express.json())

//localhost:3000/api/clientes
app.get('/api/clientes', (req, res) => {
    Cliente.find().then(documents => {
        console.log(documents)
        res.status(200).json({
            mensagem: "Tudo OK",
            clientes: documents
        })
    })
})

//localhost:3000/api/clientes
app.post('/api/clientes', (req, res) => {
    //construir um objeto do tipo Cliente com os dados vindos da requisição
    const cliente = new Cliente({
        nome: req.body.nome,
        fone: req.body.fone,
        email: req.body.email
    })
    //exibir com um log
    console.log(cliente)
    //armazenar no mongodb
    cliente.save()
    res.status(201).json({mensagem: 'Cliente inserido'})
})


module.exports = app
