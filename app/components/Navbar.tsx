import React from "react";
import { Link } from "react-router";

const Navbar = ({
  button1,
  button2,
}: {
  button1?: string;
  button2?: string;
}) => {
  return (
    <nav className="navbar  shadow-sm">
      <Link to="/">
        <p className="text-2xl font-bold">RESUMIND</p>
      </Link>
      <div>
        {button1 && (
          <Link
            to="/upload"
            className="primary-button w-fit bg-white text-black border-[1.7px] font-bold !py-[9.2px] mx-4"
          >
            {button1}
          </Link>
        )}
        {button2 && (
          <Link
            to="/upload"
            className="primary-button w-fit bg-[#57CDA4] font-bold mx-3"
          >
            {button2}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
