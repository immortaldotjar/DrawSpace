import React from "react";

const ToolButton = ({ label, active, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-medium transition-colors ${active ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
        >
            {label}
        </button>
    );
};

export default ToolButton