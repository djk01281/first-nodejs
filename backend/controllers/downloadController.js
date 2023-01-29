const { readFileById } = require('../models/fileModel')
const fs = require('fs')


const downloadController = async (req, res, params) => {
    const id = params[0]
    await readFileById(id, res)

    res.setHeader(200, {
        "Content-Type": "application/octet-stream",
    });

    res.end("All Good")
}

module.exports = { downloadController }