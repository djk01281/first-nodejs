function matchURL(url){
    const reg = /(?:\/(\w+))?(?:\/(\w+))?(?:\/(\w+))?(?:\/(\w+))?(?:\/(\w+))?/
    
    return url.match(reg)
}
    
module.exports = matchURL