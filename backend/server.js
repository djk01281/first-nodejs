// const http = require('http')
// const matchURL = require("./utils/matchURL")
// const {getRandomImage} = require("./controllers/imageController")

// const hostname = '127.0.0.1'
// const port = 3001

// const routeTable = {
//     "images":{
//         "random": {
//             "get": getRandomImage
//         }
//     }
// }

// const server = http.createServer( async (req, res) => {
//     const matchResult = matchURL(req.url)
//     const groups = matchResult.groups
//     console.log(groups)

//     const layerList = []
//     const keyValue = {}

//     const layers = ["layer1", "layer2", "layer3"]


//     for (const layer of layers){
//         if(groups[layer] !== undefined){
//             layerList.push(groups[layer])
//         }
//     }

//     if(groups["key"] !== undefined && groups["value"] !== undefined){

//         keyValue[groups["key"]] = groups["value"]
//     }

//     let temp = routeTable
    
//     console.log("---------")
//     console.log(layerList)
 
//     for (const layer of layerList){
//         console.log(temp)
//         temp = temp[layer]
//         console.log(temp)
//     }

//     const callback = temp[req.method.toLowerCase()]
//     callback(req, res, [...Object.values(keyValue)])


// })

// server.listen(port, hostname, () =>{
//     console.log('Server is Running!!')
// })



const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hellooo World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});