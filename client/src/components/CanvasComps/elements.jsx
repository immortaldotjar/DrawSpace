import rough from "roughjs";

const generator = rough.generator();

export const createElement = (id, type, x1, y1, x2, y2, color) => {
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
};