import { useEffect, useRef } from "react";
import rough from "roughjs";
import { useDraw } from "../../context/DrawContext";
import { renderElem, renderSelection } from "./renderElems";
import { useCanvasDrawing } from "../../hooks/useCanvasDrawing";
import { getBoundingBox } from "./geometry";

const Canvas = ({ elements, setElements }) => {
    const canvasRef = useRef(null);
    const { tool, color, selectedId, setSelectedId } = useDraw();
    const { startDrawing, continueDrawing, stopDrawing } = useCanvasDrawing(elements, setElements);

    useEffect(() => {
        const canvas = canvasRef.current;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const rc = rough.canvas(canvas)

        renderElem(rc, elements)

        const selected = elements.find((ele) => ele.id === selectedId)

        if (selected) {
            renderSelection(ctx, getBoundingBox(selected))
        }

    }, [elements, selectedId]);

    useEffect( () => {
        const handleKeyDown = (e) => {
            if( (e.key === "Delete" || e.key === "Backspace" ) && selectedId ){
                setElements((prev) => prev.filter((ele) => ele.id !== selectedId))
                setSelectedId(null)

            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => window.removeEventListener("keydown" ,handleKeyDown)

    }, [selectedId,setElements, setSelectedId])

    const handleMouseDown = (e) => startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    const handleMouseMove = (e) => continueDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDrawing}
            className={`canvas-full ${tool === "selection" ? "cursor-move" : "" }`}

        />
    );
};

export default Canvas 