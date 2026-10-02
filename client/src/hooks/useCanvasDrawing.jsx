import { useRef, useState } from "react"
import { createElement, moveElement, isElementEmpty } from "../components/CanvasComps/elements"
import { boxIntersect, findElementAtPoint, getBoundingBox } from "../components/CanvasComps/geometry"
import { useDraw } from "../context/DrawContext"

const useCanvasDrawing = (elements, setElements) => {
    const { tool, color, selectedIds, setSelectedIds } = useDraw()

    const [drawing, setDrawing] = useState(false)
    const [selectionBox, setSelectionBox] = useState(null)

    const currentIdRef = useRef(null)
    const dragOffsetRef = useRef({})
    const marqueeRef = useRef({ x: 0, y: 0 })

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
                const ids = selectedIds.includes(target.id) ? selectedIds : [target.id]

                setSelectedIds(ids)

                const offsets = {}

                ids.forEach((id) => {
                    const ele = elements.find((e) => e.id === id)
                    if (!ele) return

                    const box = getBoundingBox(ele)
                    offsets[id] = { x: offsetX - box.minX, y: offsetY - box.minY }
                })

                dragOffsetRef.current = offsets
            } else {
                setSelectedIds([])

                marqueeRef.current = { x: offsetX, y: offsetY }
                setSelectionBox({ x1: offsetX, y1: offsetY, x2: offsetX, y2: offsetY })
            }
            return
        }

        setSelectedIds([])

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
            if (selectionBox) {
                setSelectionBox({ x1: marqueeRef.current.x, y1: marqueeRef.current.y, x2: offsetX, y2: offsetY })
                return
            }

            const offsets = dragOffsetRef.current
            if (!Object.keys(offsets).length) return

            setElements((prev) =>
                prev.map((ele) =>
                    offsets[ele.id] ? moveElement(ele, offsetX - offsets[ele.id].x, offsetY - offsets[ele.id].y) : ele
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
        dragOffsetRef.current = {}

        if (selectionBox) {
            const box = {
                minX: Math.min(selectionBox.x1, selectionBox.x2),
                minY: Math.min(selectionBox.y1, selectionBox.y2),
                maxX: Math.max(selectionBox.x1, selectionBox.x2),
                maxY: Math.max(selectionBox.y1, selectionBox.y2),
            }

            const ids = elements.filter((ele) => boxIntersect(box, getBoundingBox(ele))).map((ele) => ele.id)

            setSelectedIds(ids)
            setSelectionBox(null)
        }

        setElements((prev) => {
            const next = prev.filter((ele) => !isElementEmpty(ele))
            return next.length === prev.length ? prev : next
        })
    }

    return { startDrawing, continueDrawing, stopDrawing, selectionBox }
}

export { useCanvasDrawing }