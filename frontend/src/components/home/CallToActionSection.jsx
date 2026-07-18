import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, Zap, Truck, ArrowRight } from "lucide-react";

function CallToActionSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const featureList = [
    { title: "Genuine OEM Products", icon: <ShieldCheck className="h-5 w-5" /> },
    { title: "Engineering Consultation", icon: <UserCheck className="h-5 w-5" /> },
    { title: "Fast RFQ Response", icon: <Zap className="h-5 w-5" /> },
    { title: "Pan-India Delivery", icon: <Truck className="h-5 w-5" /> },
  ];

  return (
    <section className="w-full bg-[#0B192C] py-24 z-10 relative overflow-hidden">
      {/* Decorative subtle background grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#FFFFFF_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column: Conversion text & CTA buttons */}
          <div className="lg:col-span-7">
            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-4"
            >
              Let's Build Your Next Project
            </motion.p>
            
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white leading-tight tracking-tight mb-4"
            >
              Ready to Source Genuine Industrial Components?
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-[#CBD5E1] text-base md:text-lg leading-relaxed max-w-2xl mb-8"
            >
              Connect with our engineering sourcing specialists for OEM products, technical 
              procurement support and fast nationwide delivery.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <Link
                to="/rfq"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F97316] hover:bg-orange-600 active:scale-95 text-white font-bold rounded-full shadow-md hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 text-sm tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] min-h-[44px]"
              >
                Request a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold rounded-full backdrop-blur-xs active:scale-95 transition-all duration-300 text-sm tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-white/55 min-h-[44px]"
              >
                Contact Our Team
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Key Trust highlights checkmark list */}
          <div className="lg:col-span-5">
            <ul className="space-y-4">
              {featureList.map((item) => (
                <motion.li
                  key={item.title}
                  variants={itemVariants}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10 transition-all duration-300 select-none group cursor-pointer"
                >
                  {/* Icon Wrapper */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F97316]/10 flex items-center justify-center border border-[#F97316]/20 text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  {/* Title */}
                  <span className="font-bold text-white text-base md:text-lg group-hover:text-[#F97316] transition-colors duration-200">
                    {item.title}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CallToActionSection;
