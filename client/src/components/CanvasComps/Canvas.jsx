import { useEffect, useRef, useState } from "react"
import rough from "roughjs"
import { useDraw } from "../../context/DrawContext"
import { useViewport } from "../../context/ViewportContext"
import { renderElem, renderSelection, renderMarquee } from "./renderElems"
import { screenToWorld } from "./viewport"
import { findElementAtPoint, getBoundingBox } from "./geometry"
import { useCanvasDrawing } from "../../hooks/useCanvasDrawing"
import { TEXT_SIZE } from "./text"
import { createTextElement } from "./elements"
import TextEditor from "./TextEditor"
import TextLayer from "./TextLayer"

const Canvas = ({ elements, setElements }) => {
    const canvasRef = useRef(null)
    const lastPointRef = useRef({ x: 0, y: 0 })
    const { tool, color, selectedIds, setSelectedIds } = useDraw()
    const { viewport, setViewport } = useViewport()

    const { startDrawing, continueDrawing, stopDrawing, selectionBox } = useCanvasDrawing(elements, setElements)

    const [spacePressed, setSpacePressed] = useState(false)
    const [isPanning, setIsPanning] = useState(false)
    const [editing, setEditing] = useState(null)

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.save()
        ctx.translate(viewport.x, viewport.y)
        ctx.scale(viewport.scale, viewport.scale)

        const rc = rough.canvas(canvas)
        renderElem(rc, elements)

        selectedIds.forEach((id) => {
            const selected = elements.find((ele) => ele.id === id)
            if (selected) renderSelection(ctx, getBoundingBox(selected), viewport.scale)
        })

        if (selectionBox) {
            const box = {
                minX: Math.min(selectionBox.x1, selectionBox.x2),
                minY: Math.min(selectionBox.y1, selectionBox.y2),
                maxX: Math.max(selectionBox.x1, selectionBox.x2),
                maxY: Math.max(selectionBox.y1, selectionBox.y2),
            }
            renderMarquee(ctx, box, viewport.scale)
        }

        ctx.restore()
    }, [elements, selectedIds, viewport, selectionBox])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === "TEXTAREA") return
            if (e.code === "Space") setSpacePressed(true)
            if ((e.key === "Delete" || e.key === "Backspace") && selectedIds.length) {
                setElements((prev) => prev.filter((ele) => !selectedIds.includes(ele.id)))
                setSelectedIds([])
            }
        }

        const handleKeyUp = (e) => {
            if (e.code === "Space") setSpacePressed(false)
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [selectedIds, setElements, setSelectedIds])

    useEffect(() => {
        const canvas = canvasRef.current

        const handleWheel = (e) => {
            e.preventDefault()

            if (e.ctrlKey || e.metaKey) {
                const factor = 1 - e.deltaY * 0.001
                setViewport((prev) => {
                    const newScale = Math.min(4, Math.max(0.2, prev.scale * factor))
                    const worldX = (e.offsetX - prev.x) / prev.scale
                    const worldY = (e.offsetY - prev.y) / prev.scale
                    return { scale: newScale, x: e.offsetX - worldX * newScale, y: e.offsetY - worldY * newScale }
                })
            } else {
                setViewport((prev) => ({ ...prev, x: prev.x - e.deltaX, y: prev.y - e.deltaY }))
            }
        }

        canvas.addEventListener("wheel", handleWheel, { passive: false })
        return () => canvas.removeEventListener("wheel", handleWheel)
    }, [setViewport])

    useEffect(() => {
        const handleWindowMouseMove = (e) => {
            const canvas = canvasRef.current
            const rect = canvas.getBoundingClientRect()
            const offsetX = e.clientX - rect.left
            const offsetY = e.clientY - rect.top

            if (isPanning) {
                const dx = e.clientX - lastPointRef.current.x
                const dy = e.clientY - lastPointRef.current.y
                lastPointRef.current = { x: e.clientX, y: e.clientY }
                setViewport((prev) => ({ ...prev, x: prev.x + dx, y: prev.y + dy }))
                return
            }

            const world = screenToWorld(offsetX, offsetY, viewport)
            continueDrawing(world.x, world.y)
        }

        const handleWindowMouseUp = () => {
            setIsPanning(false)
            stopDrawing()
        }

        window.addEventListener("mousemove", handleWindowMouseMove)
        window.addEventListener("mouseup", handleWindowMouseUp)

        return () => {
            window.removeEventListener("mousemove", handleWindowMouseMove)
            window.removeEventListener("mouseup", handleWindowMouseUp)
        }
    }, [isPanning, viewport, continueDrawing, stopDrawing, setViewport])

    const handleMouseDown = (e) => {
        if (editing) return

        if (spacePressed) {
            setIsPanning(true)
            lastPointRef.current = { x: e.clientX, y: e.clientY }
            return
        }
        const world = screenToWorld(e.nativeEvent.offsetX, e.nativeEvent.offsetY, viewport)
        startDrawing(world.x, world.y)
    }

    const handleDbClick = (e) => {
        if (spacePressed || editing) return

        const world = screenToWorld(e.nativeEvent.offsetX, e.nativeEvent.offsetY, viewport)
        const target = findElementAtPoint(elements, world.x, world.y)

        setSelectedIds([])

        if (target && target.type === "text") {
            setEditing({
                id: target.id,
                x: target.x,
                y: target.y,
                text: target.text,
                fontSize: target.fontSize,
                color: target.color,
            })
            return
        }

        setEditing({
            id: null,
            x: world.x,
            y: world.y,
            text: "",
            fontSize: TEXT_SIZE,
            color,
        })
    }

    const handleTextCommit = (val) => {
        const isEmpty = val.trim() === ""

        if (editing.id && isEmpty) {
            setElements((prev) => prev.filter((ele) => ele.id !== editing.id))
        } else if (editing.id) {
            setElements((prev) => prev.map((ele) => (ele.id === editing.id ? { ...ele, text: val } : ele)))
        } else if (!isEmpty) {
            setElements((prev) => [...prev, createTextElement(Date.now(), editing.x, editing.y, val, editing.color)])
        }

        setEditing(null)
    }

    const cursorClass = spacePressed
        ? isPanning
            ? "cursor-grabbing"
            : "cursor-grab"
        : tool === "selection"
            ? ""
            : ""

    return (
        <>
            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onDoubleClick={handleDbClick}
                className={`canvas-full ${cursorClass}`}
            />
            <TextLayer elements={elements} viewport={viewport} editingId={editing?.id} />
            {editing && (
                <TextEditor
                    key={editing.id ?? "new"}
                    left={editing.x * viewport.scale + viewport.x}
                    top={editing.y * viewport.scale + viewport.y}
                    initialText={editing.text}
                    fontSize={editing.fontSize}
                    color={editing.color}
                    scale={viewport.scale}
                    onCommit={handleTextCommit}
                />
            )}
        </>
    )
}

export default Canvas