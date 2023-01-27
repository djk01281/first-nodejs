const fs = require('fs')
const { pipeline } = require('stream')
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline)
const path = require('path');
const { reset } = require('nodemon');
const { saveImage, mergeImage } = require('../models/uploadModel')

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
    res.end(mergeResult)
}

module.exports = { uploadImage, finishUploadImage }
