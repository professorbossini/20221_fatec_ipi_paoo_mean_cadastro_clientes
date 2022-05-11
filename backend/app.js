const express = require ('express')
const app = express()

const clientes = [
    {
        id: '1',
        nome: 'José',
        fone: '12345678',
        email: 'jose@email.com'
    },
    {
        id: '2',
        nome: "Antônio",
        fone: '98765432',
        email: 'antonio@email.com'
    }
]


//localhost:3000/api/clientes
app.use('/api/clientes', (req, res) => {
    res.status(200).json({
        mensagem: "Tudo OK",
        clientes: clientes
    })
})

module.exports = app
