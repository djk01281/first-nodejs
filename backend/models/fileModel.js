const path = require('path')
const fs = require('fs')

const fileInfoById = async (searchId) => {
    const filePath = path.join(__dirname, '../data/fileInfo.json')
    const fileInfo = JSON.parse(fs.readFileSync(filePath))
    const savedIds = Object.keys(fileInfo)
    for (const savedId of savedIds) {
        if (savedId === searchId) {
            return (fileInfo[savedId])
        }
    }
    return undefined
}

const saveFileInfo = async (id, fileName, time) => {
    const filePath = path.join(__dirname, '../data/fileInfo.json')
    const fileInfo = JSON.parse(fs.readFileSync(filePath))
    fileInfo[id] = { "fileName": fileName, "time": time }

    console.log(fileInfo)

    fs.writeFileSync(filePath, JSON.stringify(fileInfo))

    console.log("Saved File Info!!")
}

module.exports = { fileInfoById, saveFileInfo }