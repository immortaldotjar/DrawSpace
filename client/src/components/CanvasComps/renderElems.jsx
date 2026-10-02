import { TEXT_FONT, TEXT_LINE_HEIGHT } from "./text"

const renderPencil = (ctx, ele) => {
    const pts = ele.points

    if (pts.length < 2) return

    ctx.save()
    ctx.strokeStyle = ele.color
    ctx.lineWidth = 2
    ctx.lineJoin = "round"
    ctx.lineCap = "round"

    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)


    for (let i = 1; i < pts.length - 1; i++) {

        const midX = (pts[i].x + pts[i + 1].x) / 2
        const midY = (pts[i].y + pts[i + 1].y) / 2

        ctx.quadraticCurveTo(pts[i].x, pts[i].y, midX, midY)



    }

    ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y)
    ctx.stroke()
    ctx.restore()
}

const renderElem = (rc, elements) => {
    elements.forEach((ele) => {
        const ctx = rc.canvas.getContext("2d")

        if (ele.type === "text") {
            return
        }

        if (ele.type === "pencil") {
            renderPencil(ctx, ele)
            return
        }

        const config = {
            seed: ele.id,
            stroke: ele.color,
            roughness: 0.5,
            strokeWidth: 2,

        }

        if (ele.type === "line") {
            rc.line(ele.x1, ele.y1, ele.x2, ele.y2, config)
        } else if (ele.type === "rectangle") {
            rc.rectangle(ele.x1, ele.y1, ele.x2 - ele.x1, ele.y2 - ele.y1, config)
        } else if (ele.type === "ellipse") {
            rc.ellipse((ele.x1 + ele.x2) / 2, (ele.y1 + ele.y2) / 2, ele.x2 - ele.x1, ele.y2 - ele.y1, config)
        }
    })
}

const renderSelection = (ctx, box, scale) => {
    ctx.save()

    ctx.strokeStyle = "white"
    ctx.setLineDash([6 / scale, 4 / scale])
    ctx.lineWidth = 1 / scale

    const pad = 6 / scale
    ctx.strokeRect(box.minX - pad, box.minY - pad, box.maxX - box.minX + pad * 2, box.maxY - box.minY + pad * 2)

    ctx.restore()
}

const renderMarquee = (ctx, box, scale) => {
    ctx.save()

    ctx.fillStyle = "rgba(255, 255, 255, 0.02)"
    ctx.strokeStyle = "white"

    ctx.lineWidth = 1 / scale

    const rad = 6 / scale
    // ctx.fillRect(box.minX, box.minY, box.maxX - box.minX, box.maxY - box.minY)
    // ctx.strokeRect(box.minX, box.minY, box.maxX - box.minX, box.maxY - box.minY)

    ctx.beginPath()
    ctx.roundRect(box.minX, box.minY, box.maxX - box.minX, box.maxY - box.minY,rad)
    ctx.fill()
    ctx.stroke()

    ctx.restore()
}

export { renderElem, renderSelection, renderMarquee }