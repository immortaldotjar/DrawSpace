export const getBoundingBox = (el) => {
    if (el.type === "pencil") {
        const xs = el.points.map((p) => p.x);
        const ys = el.points.map((p) => p.y);
        return { minX: Math.min(...xs), minY: Math.min(...ys), maxX: Math.max(...xs), maxY: Math.max(...ys) };
    }
    return {
        minX: Math.min(el.x1, el.x2),
        minY: Math.min(el.y1, el.y2),
        maxX: Math.max(el.x1, el.x2),
        maxY: Math.max(el.y1, el.y2),
    };
};

export const isPointInBox = (x, y, box) => {
    return x >= box.minX - 8 && x <= box.maxX + 8 && y >= box.minY - 8 && y <= box.maxY + 8;
};

export const findElementAtPoint = (elements, x, y) => {
    return [...elements].reverse().find((el) => isPointInBox(x, y, getBoundingBox(el)));
};