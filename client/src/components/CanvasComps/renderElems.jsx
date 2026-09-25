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


