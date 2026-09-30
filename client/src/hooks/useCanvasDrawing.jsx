import { useRef, useState } from "react"
import { createElement, moveElement, isElementEmpty } from "../components/CanvasComps/elements"
import { findElementAtPoint, getBoundingBox } from "../components/CanvasComps/geometry"
import { useDraw } from "../context/DrawContext"

const useCanvasDrawing = (elements, setElements) => {
    const { tool, color, selectedId, setSelectedId } = useDraw()

    const [drawing, setDrawing] = useState(false)
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
    const currentIdRef = useRef(null)

    const startDrawing = (offsetX, offsetY) => {
        setDrawing(true)

        if (tool === "eraser") {
            const target = findElementAtPoint(elements, offsetX, offsetY)
            if (target) setElements(elements.filter((ele) => ele.id !== target.id))
            return
        }

        if (tool === "selection") {
            const target = findElementAtPoint(elements, offsetX, offsetY)
            if (target) {
                setSelectedId(target.id)
                const box = getBoundingBox(target)
                setDragOffset({ x: offsetX - box.minX, y: offsetY - box.minY })
            } else {
                setSelectedId(null)
            }
            return
        }

        setSelectedId(null)
        const id = Date.now()
        currentIdRef.current = id
        const element = createElement(id, tool, offsetX, offsetY, offsetX, offsetY, color)
        setElements([...elements, element])
    }

    const continueDrawing = (offsetX, offsetY) => {
        if (!drawing) return

        if (tool === "eraser") {
            const target = findElementAtPoint(elements, offsetX, offsetY)
            if (target) setElements((prev) => prev.filter((ele) => ele.id !== target.id))
            return
        }

        if (tool === "selection") {
            if (!selectedId) return
            setElements((prev) =>
                prev.map((ele) =>
                    ele.id === selectedId ? moveElement(ele, offsetX - dragOffset.x, offsetY - dragOffset.y) : ele
                )
            )
            return
        }

        setElements((prev) =>
            prev.map((ele) => {
                if (ele.id !== currentIdRef.current) return ele
                if (tool === "pencil") return { ...ele, points: [...ele.points, { x: offsetX, y: offsetY }] }
                return createElement(ele.id, tool, ele.x1, ele.y1, offsetX, offsetY, ele.color)
            })
        )
    }

    const stopDrawing = () => {
        setDrawing(false)
        currentIdRef.current = null
        setElements((prev) => {
            const next = prev.filter((ele) => !isElementEmpty(ele))
            return next.length === prev.length ? prev : next
        })
    }

    return { startDrawing, continueDrawing, stopDrawing }
}

export { useCanvasDrawing }