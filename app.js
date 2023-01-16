const http = require('http')
const hostname = '127.0.0.1'
const port = 3000
const server = http.createServer((req, res) => {

    if(req.url==="/api" && req.method === 'GET'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({a:1, b:2}))
    }
    else if(req.method === 'GET'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end("add /api at the end of url")
    }
})

server.listen(port, hostname, () =>{
    console.log('Server is Running!!')
})

