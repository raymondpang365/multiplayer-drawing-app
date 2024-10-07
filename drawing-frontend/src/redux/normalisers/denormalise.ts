export default (obj) => {

    return obj != null ? Object.keys(obj).map(k => obj[k]) : []
}