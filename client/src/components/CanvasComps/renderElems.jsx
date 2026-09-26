const renderElem = (rc, elements) => {
    elements.forEach((ele) => {
        if (ele.type === "pencil") {
            for (let i = 0; i < ele.points.length - 1; i++) {
                rc.line(ele.points[i].x, ele.points[i].y, ele.points[i + 1].x, ele.points[i + 1].y, {
                    seed: ele.id + i,
                    stroke: ele.color,
                    roughness: 0.5,
                })
            }
            return
        }

        const config = {
            seed: ele.id,
            stroke: ele.color,
            roughness: 0.5,

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

const renderSelection = (ctx, box,scale) => {
    ctx.save()

    ctx.strokeStyle = "grey"
    ctx.setLineDash([6 / scale, 4 / scale])
    ctx.lineWidth = 1 /scale

    const pad = 6 / scale
    ctx.strokeRect(box.minX - pad, box.minY - pad, box.maxX - box.minX + pad * 2, box.maxY - box.minY + pad * 2)

    ctx.restore()
}


export { renderElem, renderSelection }