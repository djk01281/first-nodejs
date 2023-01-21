const Catimages = require('../data/catImages.json')
const Dogimages = require('../data/catImages.json')

const Images = {"cat": Catimages, "dog": Dogimages}

const fs = require('fs')

const findById = (animal, id) => {
    return new Promise((resolve, reject) =>{
        fs.createReadStream(Catimages)
        resolve(Catimages)
    })
}

const allIds = (animal) => {
    return new Promise ((resolve, reject) => {
        resolve(Object.keys(Images[animal]))
    })
}

module.exports = {findById, allIds}