import React from "react";

const Button = ({ children, onClick, variant = "primary", className = "" }) => {
    const base = "px-5 py-2.5 rounded-full font-medium text-sm transition-colors";
    const variants = {
        primary: "bg-neutral-900 text-white hover:bg-neutral-800",
        outline: "border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white",
    }

    return (
        <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

export default Button;