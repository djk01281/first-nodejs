const http = require('http')

const fs = require('fs').promises
const html = fs.readFile(__dirname + "/index.html")

const hostname = '127.0.0.1'
const port = 3000


const server = http.createServer(async (req, res) => {

    if(req.url==="/api" && req.method === 'GET'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({"name": "cat"}))
    }
    else if(req.method === 'GET'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        const data = await fs.readFile('./index.html')
        res.end(data)
    }
})

server.listen(port, hostname, () =>{
    console.log('Server is Running!!')
})

