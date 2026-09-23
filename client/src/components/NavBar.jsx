import React from "react";

const links = ["Home", "Board", "About", "Contact"];

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between bg-white rounded-full px-4 py-3">
      <div className="w-9 h-9 rounded-full bg-brand-dark" />

      <ul className="hidden md:flex items-center gap-8 text-sm text-neutral-700">
        {links.map((link) => (
          <li key={link} className="cursor-pointer hover:text-neutral-900">
            {link}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <button className="bg-neutral-900 text-white text-sm px-5 py-2.5 rounded-full">
          Start Drawing
        </button>
        <div className="w-9 h-9 rounded-full bg-neutral-900" />
      </div>
    </nav>
  );
};

export default NavBar;