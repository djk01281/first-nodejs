const { readFileById } = require('../models/fileModel')
const fs = require('fs')


const downloadController = async (req, res, params) => {
    const id = params[0]
    res.setHeader("200", {
        "Content-Type": "application/octet-stream",
    });
    await readFileById(id, res)



    res.end("All Good")
}

module.exports = { downloadController }