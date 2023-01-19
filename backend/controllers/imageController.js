const {allIds, findById} = require('../models/imageModel')

async function getRandomImage(req, res, params){
    try{
        const ids = await allIds(params[0])
        const randomIndex = Math.floor(Math.random() * ids.length)
        const randomId = ids[randomIndex]

        const image = await findById(params[0], randomId)

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(image))
    }

    catch(error){console.log(error)}
}

module.exports = {getRandomImage}