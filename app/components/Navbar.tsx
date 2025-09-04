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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      if (auth?.signOut) {
        await auth.signOut();
      } else {
        // fallback - if your lib exposes signOut differently
        console.warn("auth.signOut not found");
      }
      navigate("/");
      // small delay sometimes helps ensure auth state clears before reload
      setTimeout(() => window.location.reload(), 50);
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/30 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-20">
          {/* CENTER: logo centered on small screens, left-aligned on md+ */}
          <div className="flex justify-center md:justify-start items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/images/logo.png"
                className="w-12 sm:w-14 md:w-16"
                alt="Pathora Logo"
              />
              <span className="ml-2 text-xl sm:text-2xl md:text-3xl font-bold text-[#42C3C2] -translate-0.5">
                Pathora
              </span>
            </Link>
          </div>

          {/* RIGHT: buttons / hamburger */}
          <div className="flex items-center justify-end">
            {/* Desktop buttons (visible md+) - they will align to the right edge */}
            <div className="hidden md:flex items-center gap-3">
              {button1 && (
                <Link
                  to={`${link1 ?? "#"}`}
                  className="inline-flex items-center justify-center bg-white text-black border-[1.5px] border-gray-200 font-semibold py-2 px-4 rounded-md hover:shadow-sm"
                >
                  {button1}
                </Link>
              )}

              {button2 && (
                <Link
                  to={`${link2 ?? "#"}`}
                  className="inline-flex items-center justify-center bg-[#57CDA4] text-white font-semibold py-2 px-4 rounded-md hover:shadow-sm"
                >
                  {button2}
                </Link>
              )}

              {auth?.user && (
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center justify-center bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Sign Out
                </button>
              )}
            </div>

            {/* Mobile hamburger (visible below md) */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen((s) => !s)}
                className="w-10 h-10 rounded-full flex items-center justify-center focus:outline-none"
                aria-label="Toggle menu"
              >
                {/* morphing 3-dots icon */}
                <span
                  className={`block w-2 h-2 rounded-full bg-[#57CDA4] transform transition-all duration-300 ${
                    mobileMenuOpen
                      ? "translate-y-1.5 rotate-45 scale-110"
                      : "-translate-y-1.5"
                  }`}
                />
                <span
                  className={`block w-2 h-2 rounded-full bg-[#57CDA4] mx-1 transform transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block w-2 h-2 rounded-full bg-[#57CDA4] transform transition-all duration-300 ${
                    mobileMenuOpen
                      ? "-translate-y-1.5 -rotate-45 scale-110"
                      : "translate-y-1.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE DROPDOWN */}
      <div
        className={`md:hidden absolute left-0 right-0 w-full transition-all duration-300 ${
          mobileMenuOpen
            ? "max-h-[600px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
        style={{ top: "80px" }} /* ensure this matches the header height */
      >
        <div className="bg-white/95 backdrop-blur-lg shadow-lg border-t border-gray-200 overflow-hidden">
          <div className="flex flex-col p-4 gap-3">
            {button1 && (
              <Link
                to={`${link1 ?? "#"}`}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-white text-black border border-gray-200 rounded-md font-semibold"
              >
                {button1}
              </Link>
            )}

            {button2 && (
              <Link
                to={`${link2 ?? "#"}`}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-[#57CDA4] text-white rounded-md font-semibold"
              >
                {button2}
              </Link>
            )}

            {auth?.user && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
                className="w-full text-center py-3 bg-red-500 text-white rounded-md font-semibold"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
