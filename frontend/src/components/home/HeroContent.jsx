import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HeroButtons from "./HeroButtons";

function HeroContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full z-10 py-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Eyebrow Accent */}
      <motion.p
        variants={itemVariants}
        className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#F97316] uppercase mb-4"
      >
        Premium Industrial Sourcing
      </motion.p>

      {/* Main Heading */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white leading-[1.05] tracking-tight mb-8"
      >
        Engineering <br />
        Procurement, <br />
        <span className="text-[#F97316]">Delivered with Precision.</span>
      </motion.h1>

      {/* Supporting Text */}
      <motion.p
        variants={itemVariants}
        className="text-[#CBD5E1] text-base md:text-lg lg:text-xl font-normal leading-relaxed max-w-3xl mb-12"
      >
        India's B2B sourcing partner for road construction machinery,
        industrial automation, electrical control systems, and genuine spare parts.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div variants={itemVariants} className="w-full mb-16">
        <HeroButtons />
      </motion.div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        variants={itemVariants}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.3em] font-bold text-slate-400 uppercase select-none">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default HeroContent;
