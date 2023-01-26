const matchURL = require("./utils/matchURL")

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const { getRandomImage } = require("./controllers/imageController")
const { uploadImage, finishUploadImage } = require('./controllers/uploadController');
const { optionsController } = require("./controllers/optionsController");


const routeTable = {
  "images": {
    "random": {
      "get": getRandomImage
    }
  },
  "upload": {
    "post": uploadImage,
    "get": finishUploadImage,
    "options": optionsController
  }
}

const server = http.createServer(async (req, res) => {

  //capture path and parameters from URL
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Max-Age', 2592000); // 30 days

  console.log(req.url)

  const matchResult = matchURL(req.url)
  const groups = matchResult.groups
  console.log(groups)

  //get the relevent callback function
  const layerList = []
  const layers = ["layer1", "layer2", "layer3"]

  for (const layer of layers) {
    if (groups[layer] !== undefined) {
      layerList.push(groups[layer])
    }
  }

  let temp = routeTable

  console.log("---------")
  console.log(layerList)

  for (const layer of layerList) {
    if (layer)
    temp = temp[layer]
  }

  const method = req.method.toLocaleLowerCase()
  console.log(method)

  const callback = temp[method]
  console.log(callback)
  //get the parameters from URL if exists
  const keyValue = {}

  if (groups["key"] !== undefined && groups["value"] !== undefined) {

    keyValue[groups["key"]] = groups["value"]
  }

  const params = Object.values(keyValue)

  //CASE 1: Parameters Exists
  if (params.length > 0) {
    console.log("calling callback with params")
    callback(req, res, [...Object.values(keyValue)])
  }

  //CASE 2: No Parameters
  else {
    console.log("calling callback wihthout params")
    callback(req, res)
  }

})

server.listen(port, hostname, () => {
  console.log('Server is Running!!')
})

