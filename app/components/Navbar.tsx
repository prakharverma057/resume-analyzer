import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 
      ${scrolled ? "bg-white/40 backdrop-blur-md shadow-md" : "bg-transparent"}
    `}
    >
      <nav className="relative h-20 md:h-24 flex items-center px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        {/* Mobile Layout */}
        <div className="flex md:hidden items-center justify-between w-full">
          <Link to="/" className="flex items-center -translate-x-5">
            <img
              src="/images/logo.png"
              className="w-12 sm:w-14"
              alt="Pathora Logo"
            />
            <p className="text-xl sm:text-2xl font-bold text-[#57CDA4]">
              Pathora
            </p>
          </Link>

          <button
            className="w-2 h-2 flex flex-col justify-center items-center group"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span
              className={`w-2 h-2 rounded-full bg-[#57CDA4] transition-all duration-300 ${
                mobileMenuOpen
                  ? "translate-y-1.5 rotate-45 scale-125"
                  : "-translate-y-1.5"
              }`}
            ></span>
            <span
              className={`w-2 h-2 rounded-full bg-[#57CDA4] transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`w-2 h-2 rounded-full bg-[#57CDA4] transition-all duration-300 ${
                mobileMenuOpen
                  ? "-translate-y-1.5 -rotate-45 scale-125"
                  : "translate-y-1.5"
              }`}
            ></span>
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center w-full">
          {/* Logo + Name */}
          <Link to="/" className="flex items-center">
            <img src="/images/logo.png" className="w-16" alt="Pathora Logo" />
            <p className="text-3xl font-bold text-[#57CDA4] ml-2">Pathora</p>
          </Link>

          {/* Desktop Buttons */}
          <div className="flex items-center space-x-4">
            {button1 && (
              <Link
                to={`${link1}`}
                className="primary-button bg-white text-black border-[1.7px] font-bold !py-[9px] px-5"
              >
                {button1}
              </Link>
            )}
            {button2 && (
              <Link
                to={`${link2}`}
                className="primary-button bg-[#57CDA4] font-bold px-5"
              >
                {button2}
              </Link>
            )}
            {/* ✅ Sign Out Button */}
            {auth?.user && (
              <button
                onClick={handleSignOut}
                className="primary-button bg-red-500 text-white font-bold px-5"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg border-t border-gray-200 animate-fadeIn">
          <div className="flex flex-col p-6 space-y-4">
            {button1 && (
              <Link
                to={`${link1}`}
                onClick={() => setMobileMenuOpen(false)}
                className="primary-button w-full bg-white text-black border-[1.7px] font-bold py-4 text-center text-base"
              >
                {button1}
              </Link>
            )}
            {button2 && (
              <Link
                to={`${link2}`}
                onClick={() => setMobileMenuOpen(false)}
                className="primary-button w-full bg-[#57CDA4] font-bold py-4 text-center text-base"
              >
                {button2}
              </Link>
            )}
            {/* ✅ Mobile Sign Out */}
            {auth?.user && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
                className="primary-button w-full bg-red-500 text-white font-bold py-4 text-center text-base"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
