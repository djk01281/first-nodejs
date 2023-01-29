const {emptyTimeHolder} = require('../models/timeModel')

const expireController = async() => {
    await emptyTimeHolder()
}

module.exports = {expireController}