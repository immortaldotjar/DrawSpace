import { useEffect, useRef, useState } from "react";
import rough from "roughjs";
import { useDraw } from "../../context/DrawContext";
import { useViewport } from "../../context/ViewportContext";
import { renderElem, renderSelection } from "./renderElems";
import { screenToWorld } from "./viewport";
import { getBoundingBox } from "./geometry";
import { useCanvasDrawing } from "../../hooks/useCanvasDrawing";

const Canvas = ({ elements, setElements }) => {
    const canvasRef = useRef(null);
    const lastPointRef = useRef({ x: 0, y: 0 });
    const { tool, selectedId, setSelectedId } = useDraw();
    const { viewport, setViewport } = useViewport();
    const { startDrawing, continueDrawing, stopDrawing } = useCanvasDrawing(elements, setElements);
    const [spacePressed, setSpacePressed] = useState(false);
    const [isPanning, setIsPanning] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(viewport.x, viewport.y);
        ctx.scale(viewport.scale, viewport.scale);

        const rc = rough.canvas(canvas);
        renderElem(rc, elements);

        const selected = elements.find((ele) => ele.id === selectedId);
        if (selected) renderSelection(ctx, getBoundingBox(selected), viewport.scale);

        ctx.restore();
    }, [elements, selectedId, viewport]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === "Space") setSpacePressed(true);
            if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
                setElements((prev) => prev.filter((ele) => ele.id !== selectedId));
                setSelectedId(null);
            }
        };
        const handleKeyUp = (e) => {
            if (e.code === "Space") setSpacePressed(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [selectedId, setElements, setSelectedId]);

    useEffect(() => {
        const canvas = canvasRef.current;

        const handleWheel = (e) => {
            e.preventDefault();

            if (e.ctrlKey || e.metaKey) {
                const factor = 1 - e.deltaY * 0.001;
                setViewport((prev) => {
                    const newScale = Math.min(4, Math.max(0.2, prev.scale * factor));
                    const worldX = (e.offsetX - prev.x) / prev.scale;
                    const worldY = (e.offsetY - prev.y) / prev.scale;
                    return { scale: newScale, x: e.offsetX - worldX * newScale, y: e.offsetY - worldY * newScale };
                });
            } else {
                setViewport((prev) => ({ ...prev, x: prev.x - e.deltaX, y: prev.y - e.deltaY }));
            }
        };

        canvas.addEventListener("wheel", handleWheel, { passive: false });
        return () => canvas.removeEventListener("wheel", handleWheel);
    }, [setViewport]);

    const handleMouseDown = (e) => {
        if (spacePressed) {
            setIsPanning(true);
            lastPointRef.current = { x: e.clientX, y: e.clientY };
            return;
        }
        const world = screenToWorld(e.nativeEvent.offsetX, e.nativeEvent.offsetY, viewport);
        startDrawing(world.x, world.y);
    };

    const handleMouseMove = (e) => {
        if (isPanning) {
            const dx = e.clientX - lastPointRef.current.x;
            const dy = e.clientY - lastPointRef.current.y;
            lastPointRef.current = { x: e.clientX, y: e.clientY };
            setViewport((prev) => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
            return;
        }
        const world = screenToWorld(e.nativeEvent.offsetX, e.nativeEvent.offsetY, viewport);
        continueDrawing(world.x, world.y);
    };

    const handleMouseUp = () => {
        setIsPanning(false);
        stopDrawing();
    };

    const cursorClass = spacePressed
        ? isPanning
            ? "cursor-grabbing"
            : "cursor-grab"
        : tool === "selection"
            ? "cursor-move"
            : "";

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className={`canvas-full ${cursorClass}`}
        />
    );
};

export default Canvas;