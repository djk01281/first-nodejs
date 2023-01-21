const {allIds, findById} = require('../models/imageModel')
const fs = require('fs')


async function getRandomImage(req, res, params){
    try{
        const ids = await allIds(params[0])
        console.log(`ids: ${ids}`)

        const randomIndex = Math.floor(Math.random() * ids.length)
        const randomId = ids[randomIndex]

        console.log(`randomId: ${randomId}`)
        await findById(params[0], randomId, (type, data) => {res.writeHead(200, {'Content-Type': type})
        res.end(data)})
    }

    catch(error){console.log(error)}
}

module.exports = {getRandomImage}