
const randomString = (len) => {
    console.log("creating random string")
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    const availChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""

    try {
        for (let i = 0; i < len; i++) {
            const randomIndex = getRandomInt(0, availChars.length)
            result += availChars[randomIndex]
        }
        console.log(result)
    }
    catch {
        console.log("could not generate random string")
    }
    return result
}
module.exports = { randomString }

