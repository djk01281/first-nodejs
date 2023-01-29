const fs = require('fs')
const { pipeline } = require('stream')
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline)
const path = require('path');
const readdirAsync = promisify(fs.readdir)
const unlinkSync = promisify(fs.unlink)

const saveImage = async (req) => {
    const uploadResult = "Upload Complete"
    const uploadStatusCode = 200

    const fileName = req.headers['file-name']

    //create directory for a new image
    const dirPath = path.join(__dirname, '../data', fileName)
    if (!fs.existsSync(dirPath)) {
        await fs.mkdirSync(dirPath);
        console.log("made directory")
    }

    //create file for a new chunk of image
    const chunkPath = path.join(dirPath, req.headers['chunk-id'])
    await fs.writeFileSync(chunkPath, '')


    //create writestream for a new chunk of image
    const fileStream = await fs.createWriteStream(chunkPath)

    //count the number of bytes received from chunk
    let bytesReceived = 0
    req.on('data', (data) => {
        bytesReceived += Buffer.from(data).length
    })

    //connect read stream(`req`) with writestream(`fileStream`)
    await pipelineAsync(req, fileStream)

    //check if (bytes sent by client === bytes received from backend)
    const bytesSent = parseInt(req.headers['content-length'])
    console.log(`Bytes Sent: ${bytesSent}, Bytes Received: ${bytesReceived}`)

    if (bytesSent !== bytesReceived) {
        fs.unlinkSync(chunkPath) //erase file
        console.log('missing bytes')
        uploadStatusCode = 408
        uploadResult = "Bytes Missing"
    }

    return [uploadStatusCode, uploadResult]
}

const mergeImage = async (fileName) => {

    try {
        //create file for the whole image
        const dirPath = path.join(__dirname, '../data', fileName)
        const imagePath = path.join(dirPath, `../image${fileName}`)
        fs.writeFileSync(imagePath, '')
        console.log('file created')

        //read file names of the chunks of image
        const dir = await readdirAsync(dirPath)

        //name of the chunks : 0 ~ chunkCount - 1, strings, not in order
        dir.sort((a, b) => parseInt(a) - parseInt(b))
        console.log(dir)

        //create & connect read stream(chunks) with writestream(image)
        for await (const f of dir) {
            console.log(typeof f)
            const chunkPath = path.join(dirPath, f)
            const readST = await fs.createReadStream(chunkPath)
            const writeST = await fs.createWriteStream(imagePath, { flags: 'a' })
            await pipelineAsync(readST, writeST)
            console.log('CHUNKING finished', f)
        }
        await unlinkSync(dirPath)
        console.log('Finished Upload')
        return ("Merging Finished")
    }
    catch {
        console.log('Error Merging')
        return ("Error Merging")
    }
}


module.exports = { saveImage, mergeImage }