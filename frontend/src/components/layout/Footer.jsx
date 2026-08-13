import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Factory } from "lucide-react";

function Footer() {
  const footerVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Expertise", path: "/expertise" },
    { name: "Products", path: "/products" },
    { name: "How We Work", path: "/how-we-work" },
    { name: "Projects", path: "/projects" },
    { name: "Partners", path: "/partners" },
    { name: "Contact", path: "/contact" },
    { name: "RFQ", path: "/rfq" },
  ];

  const solutions = [
    "Industrial Machinery",
    "Automation Systems",
    "Electrical Systems",
    "OEM Spare Parts",
    "Engineering Procurement",
  ];

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full bg-[#0B192C] text-[#CBD5E1] border-t border-slate-900 z-10 relative pt-24 pb-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-slate-800/80">
          <div className="lg:col-span-4 space-y-6">
            <Link
              to="/"
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] rounded-md px-1 py-1"
              aria-label="Mahi Controls Home"
            >
              <img 
                src="/logo.jpeg" 
                alt="Mahi Controls Logo" 
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Mahi Controls is an industrial sourcing partner delivering engineering products,
              technical procurement support, and coordinated logistics solutions.
            </p>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm font-semibold">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-[#F97316] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Solutions
            </h3>
            <ul className="space-y-3 text-sm font-semibold">
              {solutions.map((item) => (
                <li key={item}>
                  <Link
                    to="/expertise"
                    className="text-slate-400 hover:text-[#F97316] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] rounded"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Get in Touch
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Verified contact details will be published once confirmed. Share your inquiry
              through our contact form or request a quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold rounded-lg text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
              >
                Contact Us
              </Link>
              <Link
                to="/rfq"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-[#F97316] hover:bg-orange-600 text-white font-bold rounded-lg text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <p>© 2026 Mahi Controls. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin/login" className="hover:text-slate-300 transition-colors">
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
