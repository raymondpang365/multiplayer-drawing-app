/*
This code is adapted from:
Original Author: Alexander Fedorenko
Repository: [react-gridlines](https://github.com/alfed7/gridlines)
*/

import buildGridSvg from "./svgBuilder"
import {useEffect, useState} from "react";


const scale = 1
const cellWidth = 8
const cellHeight = 8
const lineColor = "#ccc"
const strokeWidth = 2
const dashArray = "0"
const format = "SQUARE"
const cellWidth2= 80
const cellHeight2= 80
const lineColor2 = "#ddd"
const strokeWidth2 = 1
const dashArray2 = "0"
const orientation = "portrait"

const useGridLine = () => {
    const [bg, setBg] = useState("");
    const h = cellHeight || cellWidth;
    const h2 = cellHeight2 || cellWidth2;

    useEffect(() => {
        setBg(
            buildGridSvg(
                cellWidth,
                h,
                lineColor,
                strokeWidth,
                dashArray,
                cellWidth2,
                h2,
                lineColor2,
                strokeWidth2,
                dashArray2,
                scale,
                format,
                orientation
            )
        );
    }, [
        cellWidth,
        h,
        lineColor,
        strokeWidth,
        dashArray,
        cellWidth2,
        h2,
        lineColor2,
        strokeWidth2,
        dashArray2,
        format,
        orientation,
        scale,
    ]);

    return bg
}

export default useGridLine