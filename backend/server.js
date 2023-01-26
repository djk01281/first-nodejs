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


const fs = require('fs')
const http = require('http');
const hostname = '127.0.0.1';
const port = 3001;
const { pipeline } = require('stream');
const {promisify} = require('util')

const server = http.createServer(async (req, res) => {
  const pipelineAsync = promisify(pipeline)
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
  if(req.method === 'POST'){
    const fileName = req.headers['file-name']
    
if (!fs.existsSync(`${__dirname}/data/${fileName}`)) {
    fs.mkdirSync(`${__dirname}/data/${fileName}`);
    console.log("made directory")
}
    await fs.writeFileSync(`${__dirname}/data/${fileName}/${req.headers['chunk-id']}`, '')
    const fileStream =  fs.createWriteStream(`${__dirname}/data/${fileName}/${req.headers['chunk-id']}`)
    let bytesReceived = 0
    req.on('data', (data) => {
      bytesReceived += Buffer.from(data).length
    })
    await pipelineAsync(req, fileStream) 
    
    const bytesSent = parseInt(req.headers['content-length'])
    console.log(`Bytes Sent: ${bytesSent}, Bytes Received: ${bytesReceived}`)

    if(bytesSent !== bytesReceived){ //erase file
      fs.unlinkSync(`${__dirname}/data/${fileName}/${req.headers['chunk-id']}`)
      console.log('missing bytes')
      res.statusCode = 408
    }



    console.log('POST - Response Sent')
    res.end('POST - Response Sent')
  }
  else if(req.url === '/'){
    res.end('GET - Response Sent')
  }
  //final request
  else if (req.url.length > 7 ){
    const readdirAsync = promisify(fs.readdir)
    const fileName = req.url.slice(1)
    console.log(`final, fileName: ${fileName}`)
    fs.writeFileSync(`${__dirname}/data/img${fileName}`, '')
    console.log('file created')
    
    const dir = await readdirAsync(`${__dirname}/data/${fileName}`)
    dir.sort((a, b) => parseInt(a)-parseInt(b))
    console.log(dir)
    for await (const f of dir){
      const readST =  await fs.createReadStream(`${__dirname}/data/${fileName}/${f}`)
      const writeST =  await fs.createWriteStream(`${__dirname}/data/img${fileName}`,{flags: 'a'})
      await pipelineAsync(readST, writeST)
      console.log('CHUNKING finished', f)
    }
    res.end('https://upload.wikimedia.org/wikipedia/en/6/62/Kermit_the_Frog.jpg')



    
    //TODO: read one by one, and appendFileSync
    //gather files here
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});