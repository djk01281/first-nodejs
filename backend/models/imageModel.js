const path = require('path')
const fs = require('fs')

const findById = (animal, id, callback) => {
    return new Promise(async(resolve, reject) =>{
        const imgPath = path.join(__dirname, `../data/${animal}/${id}`)

        await fs.readFile(imgPath, (err, data) => {
            if(err){ console.log(err)}
            else{callback("image/jpeg", data)}
        })

        resolve("Good!")
    })
}

const allIds = (animal) => {
    return new Promise ((resolve, reject) => {
        const imgPath = `../data/${animal}`
        const fullPath = path.join(__dirname, imgPath)
        console.log(fullPath)
        fs.readdir(fullPath, (err, files) => {
            if(err){
                console.log(err)
            }
            else{
            console.log(files)
            resolve(files)
            }
        })        
    })
}

module.exports = {findById, allIds}