import React, {MutableRefObject} from 'react'

export enum TOOLS {
    PENCIL= "pencil",
    ERASER="eraser",
    DEFAULT= "default"
}

export interface ToolIconProps {
    _selectedTool: string;
    _thickness: number;
    _color: string;
}

export interface DrawLineParams {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    ctx: CanvasRenderingContext2D;
    _color: string;
    _selectedTool: TOOLS;
    _thickness: number;
}

export interface MouseCoords {
    startX: number;
    startY: number;
    scrollLeft: number;
    scrollTop: number;
}

export interface DrawingAction {
    isMouseDown: boolean;
    color: string;
    thickness: number;
    y1: number;
    x1: number;
    y2: number;
    x2: number;
    sessionId: string;
    time: number;
    sessionNickname: string;
    selectedTool: TOOLS;
}

export interface UseScrollByWheelHandlerProps {
    zx: number;
    setZx: (value: number) => void;
    draggableRef: MutableRefObject<HTMLElement | null>;
}


export interface HandleCanvasDragHofInput {
    draggableRef: React.MutableRefObject<HTMLDivElement | null>,
    selectedTool: TOOLS,
    mouseCoords: React.MutableRefObject<MouseCoords>,
    setIsMouseDown: (value: (((prevState: boolean) => boolean) | boolean)) => void;
}

export interface HandleCanvasDraggingHofInput {
    draggableRef: React.MutableRefObject<HTMLDivElement | null>,
    selectedTool: TOOLS,
    mouseCoords: React.MutableRefObject<MouseCoords>,
    isMouseDown: boolean
}

