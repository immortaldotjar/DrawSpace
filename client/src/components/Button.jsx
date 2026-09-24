import React from "react";

const Button = ({ children, onClick, variant = "primary", className = "" }) => {
  const variants = {
    primary: "btn-dark",
    outline: "btn-outline",
    
  };

  return (
    <button onClick={onClick} className={`pill text-sm font-medium ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;