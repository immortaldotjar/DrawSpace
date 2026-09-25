import rough from "roughjs";

const generator = rough.generator();

const createElement = (id, type, x1, y1, x2, y2, color) => {
  if (type === "line") {
    return { id, type, x1, y1, x2, y2, color, roughElement: generator.line(x1, y1, x2, y2, { stroke: color, roughness: 1.5 }) };
  }
  if (type === "rectangle") {
    return { id, type, x1, y1, x2, y2, color, roughElement: generator.rectangle(x1, y1, x2 - x1, y2 - y1, { stroke: color, roughness: 1.5 }) };
  }
  if (type === "ellipse") {
    return {
      id, type, x1, y1, x2, y2, color,
      roughElement: generator.ellipse((x1 + x2) / 2, (y1 + y2) / 2, x2 - x1, y2 - y1, { stroke: color, roughness: 1.5 }),
    };
  }
  if (type === "pencil") {
    return { id, type, points: [{ x: x1, y: y1 }], color };
  }
}

const moveElement = (ele, newMinX, newMinY) => {
  if (ele.type === "pencil") {
    const xs = ele.points.map((p) => p.x)
    const ys = ele.points.map((p) => p.y)


    const offsetX = newMinX - Math.min(...xs)
    const offsetY = newMinY - Math.min(...ys)

    return {
      ...ele,
      points: ele.points.map((p) => ({
        x: p.x + offsetX, y: p.y + offsetY
      }))
    }
  }


  const minX = Math.min(ele.x1, ele.x2)
  const minY = Math.min(ele.y1, ele.y2)

  const offsetX = newMinX - minX
  const offsetY = newMinY - minY


  return createElement(ele.id, ele.type, ele.x1 + offsetX, ele.y1 + offsetY, ele.x2 + offsetX, ele.y2 + offsetY)
}

export { createElement, moveElement }