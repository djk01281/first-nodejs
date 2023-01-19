const http = require('http')
const fs = require('fs').promises
const matchURL = require("./utils/matchURL")

const html = fs.readFile(__dirname + "/index.html")

const hostname = '127.0.0.1'
const port = 3001

const routeTable = {
    "images":{
        "random": {
            "get": (value) => `This is a ${value}`
        }
    }
}

const server = http.createServer(async (req, res) => {
    const matchResult = matchURL(req.url)
    const groups = matchResult.groups
    const layerList = []
    const keyValue = {}

    const layers = ["layer1", "layer2", "layer3"]
    for (const layer of layers){
        if(groups[layer] !== undefined){
            layerList.push(groups[layer])
        }
    }

    if(groups["key"] !== undefined && groups["value"] !== undefined){

        keyValue[groups["key"]] = groups["value"]
    }

    let temp = routeTable
    for (const layer of layerList){
        temp = temp[layer]
    }

    const result = temp[req.method.toLowerCase()](...Object.values(keyValue))
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({"result": result}))
})

server.listen(port, hostname, () =>{
    console.log('Server is Running!!')
})



