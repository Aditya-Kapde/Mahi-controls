import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Factory, Menu, X } from "lucide-react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Expertise", path: "/expertise" },
    { name: "Products", path: "/products" },
    { name: "How We Work", path: "/how-we-work" },
    { name: "Projects", path: "/projects" },
    { name: "Partners", path: "/partners" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-[#0F172A] border-b border-slate-100 shadow-md overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 min-w-0">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] rounded-md px-1.5 py-1"
              aria-label="Mahi Controls Home"
            >
              <Factory
                className="h-8 w-8 text-[#F97316] group-hover:text-orange-600 transition-colors duration-300 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#0F172A] group-hover:text-slate-700 transition-colors duration-300 whitespace-nowrap">
                Mahi <span className="text-[#F97316]">Controls</span>
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center justify-center flex-1 px-4 xl:px-8 min-w-0">
            <ul className="flex space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `relative px-2 xl:px-3 py-2.5 rounded-lg text-[13px] xl:text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer min-h-[44px] inline-flex items-center justify-center whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] ${
                        isActive
                          ? "text-[#F97316]"
                          : "text-slate-600 hover:text-[#0F172A] hover:bg-slate-50"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="whitespace-nowrap">{link.name}</span>
                        {isActive && (
                          <span className="absolute bottom-1.5 left-3.5 right-3.5 h-0.5 bg-[#F97316] rounded-full" />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:flex items-center flex-shrink-0">
            <Link
              to="/rfq"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-[#F97316] hover:bg-orange-600 active:bg-orange-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:shadow-orange-500/20 active:scale-95 transition-all duration-200 text-sm tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] whitespace-nowrap"
            >
              Request a Quote
            </Link>
          </div>

          <div className="flex items-center lg:hidden flex-shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg transition-colors duration-200 min-w-[44px] min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] text-[#0F172A] hover:bg-slate-100 hover:text-slate-700"
              aria-controls="mobile-navigation"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle main menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white text-[#0F172A] ${
          isMobileMenuOpen
            ? "max-h-[550px] opacity-100 border-t border-slate-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-3 pb-6 space-y-1.5">
          <nav aria-label="Mobile Main Navigation">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `flex items-center w-full px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] min-h-[44px] ${
                        isActive
                          ? "text-[#F97316] bg-slate-50/50"
                          : "text-slate-600 hover:text-[#0F172A] hover:bg-slate-50"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="pt-4 px-4">
            <Link
              to="/rfq"
              onClick={closeMobileMenu}
              className="flex w-full items-center justify-center px-6 py-3.5 bg-[#F97316] hover:bg-orange-600 active:bg-orange-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
