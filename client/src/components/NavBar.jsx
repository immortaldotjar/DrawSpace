import React from "react";

const links = ["Home", "Board", "About", "Contact"];

const Navbar = ({ onStart }) => {
  return (
    <nav className="row-sm justify-between bg-white pill">
      <div className="btn-circle bg-brand-dark" />

      <ul className="hidden md:flex row-md text-sm text-neutral-700">
        {links.map((link) => (
          <li key={link} className="cursor-pointer hover:text-neutral-900">
            {link}
          </li>
        ))}
      </ul>

      <div className="row-sm">
        <button onClick={onStart} className="btn-dark text-sm pill">
          Start Drawing
        </button>
        <div className="btn-circle bg-neutral-900" />
      </div>
    </nav>
  );
};

export default Navbar;