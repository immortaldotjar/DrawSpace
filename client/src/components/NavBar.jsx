import React from "react";

const links = ["Home", "Board", "About", "Contact"];

const Navbar = ({ onStart }) => {
  return (
    <nav className="row-sm justify-between">


      <div className="bg-white pill">

        <div className="btn-circle bg-brand-dark" />
      </div>

      <div className="bg-white pill w-full flex justify-center items-center h-full">

        <ul className="hidden md:flex row-md text-md text-neutral-700">
          {links.map((link) => (
            <li key={link} className="cursor-pointer hover:text-neutral-900">
              {link}
            </li>
          ))}
        </ul>
      </div>


      
      <div className="row-sm bg-white pill">
        <button onClick={onStart} className="btn-dark text-sm pill">
          Start Drawing
        </button>
        <div className="btn-circle bg-neutral-900" />
      </div>
    </nav>
  );
};

export default Navbar;