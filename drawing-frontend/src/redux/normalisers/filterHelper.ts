const filterHelper = (fn, obj) => {
    const newObj = {}
    Object.keys(obj).forEach(
        k => {
            if(fn(k, obj[k])){
                newObj[k] = obj[k]
            }
        }
    )
    return Object.keys(newObj).length === 0 ? null : newObj
}

export default filterHelper