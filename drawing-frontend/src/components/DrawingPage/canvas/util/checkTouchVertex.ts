const checkTouchVertex = (mouseCoord, targetCoord) => {
    return Math.abs(targetCoord.x - mouseCoord.x) < 10 && Math.abs(targetCoord.y - mouseCoord.y) < 10
}

export default checkTouchVertex