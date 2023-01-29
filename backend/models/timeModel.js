const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const unlinkSync = promisify(fs.unlink)

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

const emptyTimeHolder = async () => {
    console.log("emptyTimeHolder running!")
    const holderPath = path.join(__dirname, '../data/timeHolder.json')
    const timeHolder = JSON.parse(fs.readFileSync(holderPath))

    const queuePath = path.join(__dirname, '../data/timeQueue.json')
    const timeQueue = JSON.parse(fs.readFileSync(queuePath))

    const times = Object.keys(timeHolder)
    for (const time of times) {
        timeQueue[time] = timeHolder[time]
    }
    fs.writeFileSync(queuePath, JSON.stringify(timeQueue))
    fs.writeFileSync(holderPath, JSON.stringify({}))
}

const expireTimeQueue = async () => {
    console.log("expireTimeQueue running!")

    const queuePath = path.join(__dirname, '../data/timeQueue.json')
    const timeQueue = JSON.parse(fs.readFileSync(queuePath))

    const times = Object.keys(timeQueue)
    const now = Date.now()
    while (times.length > 0) {
        const time = times[0]
        const passed = now - time
        console.log(passed)
        if (passed > 120000) {
            console.log('been too long!!! getting expired')
            times.shift()
            const files = timeQueue[time]
            for (const file of files) {
                const fileName = file['fileName']
                console.log(fileName)
                const filePath = path.join(__dirname, '../data', `image${fileName}`)
                delete timeQueue[JSON.stringify(time)]
                await unlinkSync(filePath)
            }
        }
        else {
            break
        }
    }
    await fs.writeFileSync(queuePath, JSON.stringify(timeQueue))
}


module.exports = { saveTimeInfo, emptyTimeHolder, expireTimeQueue }