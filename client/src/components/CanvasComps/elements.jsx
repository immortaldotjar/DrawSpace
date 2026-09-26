const createElement = (id, type, x1, y1, x2, y2, color) => {
  if (type === "pencil") {
    return { id, type, points: [{ x: x1, y: y1 }], color };
  }
  return { id, type, x1, y1, x2, y2, color };
};

const moveElement = (ele, newMinX, newMinY) => {
  if (ele.type === "pencil") {
    const xs = ele.points.map((p) => p.x);
    const ys = ele.points.map((p) => p.y);
    const offsetX = newMinX - Math.min(...xs);
    const offsetY = newMinY - Math.min(...ys);

    return {
      ...ele,
      points: ele.points.map((p) => ({ x: p.x + offsetX, y: p.y + offsetY })),
    };
  }

  const minX = Math.min(ele.x1, ele.x2);
  const minY = Math.min(ele.y1, ele.y2);
  const offsetX = newMinX - minX;
  const offsetY = newMinY - minY;

  return { ...ele, x1: ele.x1 + offsetX, y1: ele.y1 + offsetY, x2: ele.x2 + offsetX, y2: ele.y2 + offsetY };
};

export { createElement, moveElement };