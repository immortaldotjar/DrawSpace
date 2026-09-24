import React from "react";

import { useDraw } from "../context/DrawContext.jsx";
import ToolButton from "./ToolButton.jsx";

const tools = [
    { name: "pencil", label: "✎" },
    { name: "line", label: "╱" },
    { name: "rectangle", label: "▭" },
    { name: "ellipse", label: "◯" },
    { name: "eraser", label: "⌫" },
];

const colors = ["#1c1c1c", "#6b7340", "#a9d6a3", "#d6483f", "#3f6bd6"];

const Toolbar = ({ onClear }) => {
    const { tool, setTool, color, setColor } = useDraw();

    return (
        <div className="fixed top-md left-1/2 -translate-x-1/2 surface panel row-sm shadow-panel z-10">
            {tools.map((t) => (
                <ToolButton key={t.name} label={t.label} active={tool === t.name} onClick={() => setTool(t.name)} />
            ))}

            <div className="divider-x" />

            {colors.map((c) => (
                <button
                    key={c}
                    onClick={() => setColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-6 h-6 rounded-full ${color === c ? "ring-2 ring-offset-2 ring-neutral-900" : ""}`}
                />
            ))}

            <div className="divider-x" />

            <ToolButton label="✕" onClick={onClear} />
        </div>
    );
};

export default Toolbar