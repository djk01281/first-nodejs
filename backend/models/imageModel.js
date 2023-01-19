const Catimages = require('../data/catImages.json')
const Dogimages = require('../data/catImages.json')

const Images = {"cat": Catimages, "dog": Dogimages}

const findById = (animal, id) => {
    return new Promise((resolve, reject) =>{
        resolve(Images[animal][id])
    })
}

const allIds = (animal) => {
    return new Promise ((resolve, reject) => {
        resolve(Object.keys(Images[animal]))
    })
}

module.exports = {findById, allIds}