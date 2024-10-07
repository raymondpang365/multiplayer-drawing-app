import {tools} from "@components/DrawingPage/canvas/Canvas";

const drawLine = ({x1, y1, x2, y2, ctx, _color, _selectedTool, _thickness}) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const step = 1; // Pixel size
    const steps = distance / step;

    for (let i = 0; i < steps; i++) {
        const x = x1 + (dx * i) / steps;
        const y = y1 + (dy * i) / steps;
        if (_selectedTool === tools.PENCIL) {
            ctx.fillStyle = _color;
            ctx.fillRect(x, y, _thickness, _thickness);
        } else {
            ctx.clearRect(x, y, _thickness, _thickness);
        }
    }
}

export default drawLine