const express = require ('express')
const app = express()

app.use((req, res, next) => {
    console.log("Chegou uma requisição") 
    next()
})


app.use((req, res) => {
    res.send('Hello from the Back End (Express)')
})

module.exports = app
