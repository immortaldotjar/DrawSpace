import { useEffect, useRef } from "react";
import rough from "roughjs";
import { useDraw } from "../../context/DrawContext";
import { renderElem } from "./renderElems";
import { useCanvasDrawing } from "../../hooks/useCanvasDrawing";

const Canvas = ({ elements, setElements }) => {
    const canvasRef = useRef(null);
    const { tool, color } = useDraw();
    const { startDrawing, continueDrawing, stopDrawing } = useCanvasDrawing(elements, setElements, tool, color);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const rc = rough.canvas(canvas);
        renderElem(rc, elements);
    }, [elements]);

    const handleMouseDown = (e) => startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    const handleMouseMove = (e) => continueDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDrawing}
            className="canvas-full"
        />
    );
};

export default Canvas