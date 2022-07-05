require('dotenv').config()
const express = require ('express')
const cors = require ('cors')
const app = express()
const mongoose = require('mongoose')
const clienteRoutes = require ('./rotas/clientes')


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


app.use('/api/clientes', clienteRoutes)


module.exports = app
