import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Handshake, Truck, Wrench, ArrowRight } from "lucide-react";
import factoryInterior from "../../assets/factory_interior.png";

function AboutSection() {
  // Animation variants
  const leftColumnVariants = {
    hidden: { opacity: 0, x: -24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const rightColumnVariants = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const features = [
    {
      label: "Genuine Products",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
    {
      label: "Trusted Vendor Network",
      icon: <Handshake className="h-5 w-5" />,
    },
    {
      label: "Nationwide Delivery",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      label: "Technical Sourcing Support",
      icon: <Wrench className="h-5 w-5" />,
    },
  ];

  return (
    <section className="w-full bg-[#F8FAFC] py-24 border-t border-slate-100 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Core Value Proposition & Text Info */}
          <motion.div
            className="lg:col-span-7"
            variants={leftColumnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Accent Category Label */}
            <motion.p
              variants={textItemVariants}
              className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-4"
            >
              About Mahi Controls
            </motion.p>

            {/* Main Header */}
            <motion.h2
              variants={textItemVariants}
              className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#0F172A] leading-tight tracking-tight mb-4"
            >
              Engineering Procurement Specialists for India's Industrial Sector
            </motion.h2>

            {/* Sub-paragraph */}
            <motion.p
              variants={textItemVariants}
              className="text-[#334155] text-base md:text-lg font-normal leading-relaxed mb-8 max-w-3xl"
            >
              Mahi Controls delivers genuine industrial machinery, automation solutions,
              electrical systems and spare parts through a reliable nationwide sourcing network. We 
              combine technical expertise, trusted supplier relationships and responsive customer 
              service to help businesses procure with confidence.
            </motion.p>

            {/* Feature Points Grid */}
            <motion.div
              variants={textItemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-12"
            >
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-4 group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center border border-orange-100 text-[#F97316] transition-all duration-300 group-hover:bg-[#F97316] group-hover:text-white group-hover:scale-105">
                    {feature.icon}
                  </div>
                  <span className="font-semibold text-[#0F172A] text-sm md:text-base">
                    {feature.label}
                  </span>
                </div>
              ))}
            </motion.div>
 
            {/* CTA Button */}
            <motion.div variants={textItemVariants}>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F97316] hover:bg-orange-600 active:scale-95 text-white font-bold rounded-full shadow-md hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 text-sm tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] min-h-[44px]"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
 
          {/* Right Column: Premium Industrial Visual Display */}
          <motion.div
            className="lg:col-span-5"
            variants={rightColumnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Image Wrapper */}
            <div className="relative group overflow-hidden rounded-2xl shadow-xl border border-slate-200/50 aspect-[4/3] lg:aspect-square">
              {/* Actual Image */}
              <img
                src={factoryInterior}
                alt="Mahi Controls industrial warehouse and manufacturing facility"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              
              {/* Technical Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/50 via-transparent to-[#0F172A]/10 pointer-events-none opacity-80" />
              
              {/* Industrial Accent Bottom Highlights */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#F97316]" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default AboutSection;
