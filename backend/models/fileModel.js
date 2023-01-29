const path = require('path')
const fs = require('fs')
const { promisify } = require('util');
const { pipeline } = require('stream')
const pipelineAsync = promisify(pipeline)

const fileInfoById = async (searchId) => {
    const filePath = path.join(__dirname, '../data/fileInfo.json')
    const fileInfo = JSON.parse(fs.readFileSync(filePath))

    console.log(Object.keys(fileInfo))
    return fileInfo[searchId]
}

const readFileById = async (id, res) => {
    const fileInfo = await fileInfoById(id)
    const fileName = fileInfo.fileName
    console.log(fileName)
    const filePath = path.join(__dirname, '../data', `image${fileName}`)
    const readST = fs.createReadStream(filePath)
    await pipelineAsync(readST, res)
    console.log("writing complete")
}

const deleteFile = async (id) => {
    const filePath = path.join(__dirname, '../data/fileInfo.json')
    const fileInfo = JSON.parse(fs.readFileSync(filePath))
    delete fileInfo[id]
    fs.writeFileSync(filePath, JSON.stringify(fileInfo))
}

const saveFileInfo = async (id, fileName, time) => {
    const filePath = path.join(__dirname, '../data/fileInfo.json')
    const fileInfo = JSON.parse(fs.readFileSync(filePath))
    fileInfo[id] = { "fileName": fileName, "time": time }

    console.log(fileInfo)

    fs.writeFileSync(filePath, JSON.stringify(fileInfo))

    console.log("Saved File Info!!")
}

module.exports = { fileInfoById, saveFileInfo, deleteFile, readFileById }