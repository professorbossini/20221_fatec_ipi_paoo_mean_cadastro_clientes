const http = require ('http')

const server = http.createServer(
    (req, res) => {
        res.end("Hello from the Back End")
    }
)

server.listen(process.env.PORT || 3000)
//console.log("Hello, NodeJS")