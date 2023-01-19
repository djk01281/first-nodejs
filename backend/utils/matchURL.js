function matchURL(url){
    const reg = /(?:\/(?<layer1>\w+))?(?:\/(?<layer2>\w+))?(?:\/(?<layer3>\w+))?(?:\?(?<key>\w+)=(?<value>\w+))?/
    
    return url.match(reg)
}
    
module.exports = matchURL