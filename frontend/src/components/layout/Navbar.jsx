import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Factory, Menu, X } from "lucide-react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md text-[#0F172A] border-b border-slate-100 shadow-sm overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0 min-w-0">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] rounded-md px-1.5 py-1"
                aria-label="Mahi Controls Home"
              >
                <img 
                  src="/logo.jpeg" 
                  alt="Mahi Controls Logo" 
                  className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                />
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

            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <Link
                to="/admin/login"
                className="text-[13px] font-semibold text-slate-500 hover:text-slate-800 transition-colors py-2 px-3 rounded-md hover:bg-slate-50"
              >
                Staff Portal
              </Link>
              <Link
                to="/rfq"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-[#F97316] hover:bg-orange-600 active:bg-orange-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:shadow-orange-500/20 active:scale-95 transition-all duration-200 text-sm tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] whitespace-nowrap"
              >
                Request a Quote
              </Link>
            </div>

            <div className="flex items-center lg:hidden flex-shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-lg transition-colors duration-200 min-w-[44px] min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] text-[#0F172A] hover:bg-slate-100 hover:text-slate-700"
                aria-controls="mobile-navigation"
                aria-expanded={isMobileMenuOpen}
                aria-label="Open main menu"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ease-in-out"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <div
        id="mobile-navigation"
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-80 bg-white text-[#0F172A] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-100 h-20">
          <span className="font-extrabold text-xl tracking-tight text-[#0F172A]">
            Menu
          </span>
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
            aria-label="Close main menu"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav aria-label="Mobile Main Navigation">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center w-full px-4 py-3.5 rounded-xl text-[15px] font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] ${
                        isActive
                          ? "text-[#F97316] bg-orange-50"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
          <Link
            to="/admin/login"
            onClick={closeMobileMenu}
            className="flex w-full items-center justify-center px-6 py-3.5 border-2 border-slate-200 hover:border-slate-300 text-slate-600 font-bold rounded-xl transition-all duration-200 text-[15px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
          >
            Staff Portal
          </Link>
          <Link
            to="/rfq"
            onClick={closeMobileMenu}
            className="flex w-full items-center justify-center px-6 py-4 bg-[#F97316] hover:bg-orange-600 active:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all duration-200 text-[15px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
