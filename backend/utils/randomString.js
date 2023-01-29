function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const availChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

const randomString = (len) => {
    let result = ""
    for (let i = 0; i < len; i++) {
        const randomIndex = getRandomInt(0, availChars.length)
        result += availChars[randomIndex]
    }
    return result
}
module.exports = { randomString }

