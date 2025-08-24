import React, { useState, useEffect } from "react";
import { Link } from "react-router";

const Navbar = ({
  button1,
  button2,
  link1,
  link2,
}: {
  button1?: string | React.ReactNode;
  button2?: string | React.ReactNode;
  link1?: string;
  link2?: string;
}) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`fixed  navbar top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-xs shadow-md" : "bg-transparent"
      }`}
    >
      <Link to="/">
        <p className="text-3xl font-bold">
          Rez<span className=" text-[#57CDA4]">Buddy</span>
        </p>
      </Link>
      <div>
        {button1 && (
          <Link
            to={`${link1}`}
            className="primary-button w-fit bg-white text-black border-[1.7px] font-bold !py-[9.2px] mx-4"
          >
            {button1}
          </Link>
        )}
        {button2 && (
          <Link
            to={`${link2}`}
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
