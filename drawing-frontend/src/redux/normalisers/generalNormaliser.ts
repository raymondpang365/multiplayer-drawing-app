

const generalNormaliser = (list, keyName) => {
    let response = {}
    list.forEach( l => {
        let key = l[keyName]
        response[key] = l
    })
    return response
}

export default generalNormaliser