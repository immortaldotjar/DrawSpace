import React from "react";

const links = ["Home", "Board", "About", "Contact"];

const Navbar = ({ onStart }) => {
  return (
    <nav className="row-sm justify-between h-10">


      <div className="bg-white pill h-full">

        {/* <div className="btn-circle bg-brand-dark" /> */}
      </div>

      <div className="bg-white pill w-full flex justify-center items-center h-full">

        <ul className="hidden md:flex row-md text-md text-neutral-700 font-hand font-bold">
          {links.map((link) => (
            <li key={link} className="cursor-pointer hover:text-neutral-900">
              {link}
            </li>
          ))}
        </ul>
      </div>


      <button onClick={onStart} className="btn-dark text-sm h-full w-40 rounded-[8px] font-hand font-extrabold">
        Start Drawing
      </button>

    </nav>
  );
};

export default Navbar;