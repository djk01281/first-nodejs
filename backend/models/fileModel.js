const path = require('path')
const fs = require('fs')

const fileInfoById = async (searchId) => {
    const filePath = path.join(__dirname, '../data/fileInfo.js')
    const fileInfo = fs.readFileSync(filePath)
    for (const savedId of fileInfo) {
        if (savedId === searchId) {
            return (fileInfo[savedId])
        }
    }
    return undefined
}

const saveFileInfo = async (id, fileName, time) => {
    const filePath = path.join(__dirname, '../data/fileInfo.js')
    const fileInfo = fs.readFileSync(filePath)
    fileInfo[id] = { "fileName": fileName, "time": time }
    fs.writeFileSync(filePath, fileInfo)

    console.log("Saved File Info")
}

module.exports = { fileInfoById, saveFileInfo }