const fs = require('fs')
const { pipeline } = require('stream')
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline)
const path = require('path');
const { reset } = require('nodemon');
const { saveImage, mergeImage } = require('../models/uploadModel')
const { randomString } = require('../utils/randomString')
const { saveFileInfo } = require('../models/fileModel');
const { findById } = require('../models/imageModel');

const uploadImage = async (req, res) => {
    const [uploadStatusCode, uploadResult] = await saveImage(req)

    res.statusCode = uploadStatusCode
    res.end(uploadResult)
}

const finishUploadImage = async (req, res, params) => {

    //`req` : request from client, signalling every chunk being sent
    // `req.url` : /upload/imageID

    const fileName = params[0]
    const mergeResult = await mergeImage(fileName)

    const randomId = ""
    while(await findById(randomId) !== undefined){
        randomId = ""
        randomId = randomString(10)
    }   

    const uploadTime = Date.now()
    saveFileInfo(randomId, fileName, uploadTime)

    res.end(mergeResult)
}

module.exports = { uploadImage, finishUploadImage }
