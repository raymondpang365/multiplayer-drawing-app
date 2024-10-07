import generalNormaliser from "@redux/normalisers/generalNormaliser";

export default list => {
    return generalNormaliser(list, 'id')
}