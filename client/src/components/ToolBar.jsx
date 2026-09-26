import React from "react";
import { PiCursorClick as Select } from "react-icons/pi";

import { HiPencil as Pencil } from "react-icons/hi2";
import { TbRectangle as Rectangle } from "react-icons/tb";
import { FaRegCircle as Circle } from "react-icons/fa"
import { LuEraser as Eraser } from "react-icons/lu";

import { BsDashLg as Line} from "react-icons/bs";
import { useDraw } from "../context/DrawContext.jsx";
import ToolButton from "./ToolButton.jsx";

const tools = [

    { name: "selection", label: <Select /> },
    { name: "pencil", label: <Pencil /> },
    { name: "line", label: <Line /> },
    { name: "rectangle", label: <Rectangle /> },
    { name: "ellipse", label: <Circle /> },
    { name: "eraser", label: <Eraser /> },

]

const colors = ["#1c1c1c", "#6b7340", "#a9d6a3", "#d6483f", "#3f6bd6"];

const Toolbar = ({ onClear }) => {
    const { tool, setTool, color, setColor, setSelectedId } = useDraw();


    const handleToolSelect = (name) => {
        setSelectedId(null)
        setTool(name)
    }

    const handleClear = () => {
        setSelectedId(null)
        onClear()
    }
    return (
        <div className="fixed top-md left-1/2 -translate-x-1/2 surface panel row-sm shadow-panel z-10">
            {tools.map((t) => (
                <ToolButton key={t.name} label={t.label} active={tool === t.name} onClick={() => handleToolSelect(t.name)} />
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

            <ToolButton label="X" onClick={handleClear} />
        </div>
    );
};

export default Toolbar