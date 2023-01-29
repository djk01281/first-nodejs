const path = require('path')
const fs = require('fs')

// const fileInfoById = async (searchId) => {
//     const filePath = path.join(__dirname, '../data/fileInfo.json')
//     const fileInfo = JSON.parse(fs.readFileSync(filePath))
//     const savedIds = Object.keys(fileInfo)
//     for (const savedId of savedIds) {
//         if (savedId === searchId) {
//             return (fileInfo[savedId])
//         }
//     }
//     return undefined
// }

const saveTimeInfo = async (id, fileName) => {
    console.log("saveTimeInfo running!")
    const filePath = path.join(__dirname, '../data/timeHolder.json')
    const timeHolder = JSON.parse(fs.readFileSync(filePath))
    let times = Object.keys(timeHolder)

    if (times.length === 0) {
        const now = Date.now()
        timeHolder[now] = []
    }

    times = Object.keys(timeHolder)
    const lastTime = times[times.length - 1]
    console.log(lastTime)
    console.log(typeof timeHolder[lastTime])

    timeHolder[lastTime].push({ "id": id, "fileName": fileName })
    fs.writeFileSync(filePath, JSON.stringify(timeHolder))

    console.log("Saved File Info!!")
}

module.exports = { saveTimeInfo }