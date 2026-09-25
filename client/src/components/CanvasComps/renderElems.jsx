import React from "react";

const renderElem = (rc, elements) => {
    elements.forEach((ele) => {
        if (ele.type === "pencil") {
            for (let i = 0; i < ele.points.length - 1; i++) {
                rc.line(ele.points[i].x, ele.points[i].y, ele.points[i + 1].x, ele.points[i + 1].y, {
                    stroke: ele.color,
                    roughness: 1.5,
                });
            }
        } else {
            rc.draw(ele.roughElement);
        }
    });
}

const renderSelection = (ctx , box) => {

    ctx.save()
    ctx.strokeStyle = "grey"

    ctx.setLineDash([6,4])

    ctx.lineWidth = 1

    ctx.strokeRect(box.minX - 6 , box.minY - 6 , box.maxX - 12 , box.maxY -12 )

    ctx.restore()
}

export {renderElem , renderSelection }