
import {HandleCanvasDraggingHofInput, HandleCanvasDragHofInput, TOOLS} from "@components/DrawingPage/canvas/type";
import React from 'react';

export const handleCanvasDragStartHof = (
    {
        draggableRef,
        selectedTool,
        mouseCoords,
        setIsMouseDown
    }: HandleCanvasDragHofInput) => {
    return (e : React.MouseEvent) => {
        if (selectedTool !== TOOLS.DEFAULT || !draggableRef.current) return
        const startX = e.pageX - draggableRef.current.offsetLeft;
        const startY = e.pageY - draggableRef.current.offsetTop;
        const scrollLeft = draggableRef.current.scrollLeft;
        const scrollTop = draggableRef.current.scrollTop;
        mouseCoords.current = {startX, startY, scrollLeft, scrollTop}
        setIsMouseDown(true)
        document.body.style.cursor = "grabbing"
    }
}
export const handleCanvasDragEndHof =
    ({ draggableRef, selectedTool, mouseCoords, setIsMouseDown}: HandleCanvasDragHofInput) => {
    return () => {
        if (selectedTool !== TOOLS.DEFAULT) return
        setIsMouseDown(false)
        mouseCoords.current = {startX: 0, startY: 0, scrollLeft: 0, scrollTop: 0}
        if (!draggableRef.current) return
        document.body.style.cursor = "default"
    }
}
export const handleCanvasDragHof = (
    { draggableRef, selectedTool,
        mouseCoords, isMouseDown}: HandleCanvasDraggingHofInput) => {
    return (e : React.MouseEvent) => {
        if (selectedTool !== TOOLS.DEFAULT || !isMouseDown || !draggableRef.current) return;
        e.preventDefault();
        const x = e.pageX - draggableRef.current.offsetLeft;
        const y = e.pageY - draggableRef.current.offsetTop;
        const walkX = (x - mouseCoords.current.startX);
        const walkY = (y - mouseCoords.current.startY);
        draggableRef.current.scrollLeft = mouseCoords.current.scrollLeft - walkX;
        draggableRef.current.scrollTop = mouseCoords.current.scrollTop - walkY;
        console.log(walkX, walkY)
    }
}