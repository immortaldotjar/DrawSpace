import React from "react";

const ToolButton = ({ label, active, onClick }) => {
    return (
        <button onClick={onClick} className={`btn-icon ${active ? "btn-icon-active" : "btn-icon-idle"}`}>
            {label}
        </button>
    );
};

export default ToolButton;