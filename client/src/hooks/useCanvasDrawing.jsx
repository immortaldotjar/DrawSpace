import { useState } from "react";
import { createElement, moveElement } from "../components/CanvasComps/elements";
import { findElementAtPoint, getBoundingBox } from "../components/CanvasComps/geometry";
import { useDraw } from "../context/DrawContext";
export const useCanvasDrawing = (elements, setElements) => {
    const [drawing, setDrawing] = useState(false);
    const { tool, color, selectedId, setSelectedId } = useDraw()

    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })


    const startDrawing = (offsetX, offsetY) => {
        setDrawing(true);

        if (tool === "eraser") {
            const target = findElementAtPoint(elements, offsetX, offsetY);
            if (target) setElements(elements.filter((ele) => ele.id !== target.id));
            return;
        }


        if (tool === "selection") {
            const target = findElementAtPoint(element, offsetX, offsetY)

            if (target) {
                setSelectedId(target.id)

                const box = getBoundingBox(target)
                setDragOffset({ x: offsetX - box.minX, y: offsetY - box.minY })
            }else { 
                setSelectedId(null)
            }

            return


        }

        setSelectedId(null)

        const id = Date.now();
        const element = createElement(id, tool, offsetX, offsetY, offsetX, offsetY, color);
        setElements([...elements, element]);
    };

    const continueDrawing = (offsetX, offsetY) => {
        if (!drawing) return;

        if (tool === "eraser") {
            const target = findElementAtPoint(elements, offsetX, offsetY);
            if (target) setElements((prev) => prev.filter((ele) => ele.id !== target.id));
            return;
        }

        setElements((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];

            if (tool === "pencil") {
                last.points = [...last.points, { x: offsetX, y: offsetY }];
            } else {
                updated[updated.length - 1] = createElement(last.id, tool, last.x1, last.y1, offsetX, offsetY, last.color);
            }

            return updated
        })
    }

    const stopDrawing = () => setDrawing(false);

    return { startDrawing, continueDrawing, stopDrawing };
};