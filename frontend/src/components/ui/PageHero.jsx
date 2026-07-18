import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  align = "center",
}) {
  const isCenter = align === "center";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
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
    <section className="relative w-full bg-[#0F172A] py-16 md:py-24 border-b border-slate-800/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#0F172A]/95 to-[#0B192C] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#FFFFFF_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={clsx(
            "max-w-3xl",
            isCenter ? "mx-auto text-center" : "text-left"
          )}
        >
          {eyebrow && (
            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-4"
            >
              {eyebrow}
            </motion.p>
          )}

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white leading-tight tracking-tight mb-4"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              variants={itemVariants}
              className="text-[#CBD5E1] text-base md:text-lg leading-relaxed"
            >
              {description}
            </motion.p>
          )}

          {(primaryCta || secondaryCta) && (
            <motion.div
              variants={itemVariants}
              className={clsx(
                "flex flex-col sm:flex-row gap-4 mt-8",
                isCenter ? "items-center justify-center" : "items-stretch sm:items-center"
              )}
            >
              {primaryCta && (
                <Link
                  to={primaryCta.to}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F97316] hover:bg-orange-600 active:scale-95 text-white font-bold rounded-full shadow-md hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 text-sm tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] min-h-[44px]"
                >
                  {primaryCta.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
              {secondaryCta && (
                <Link
                  to={secondaryCta.to}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold rounded-full backdrop-blur-xs active:scale-95 transition-all duration-300 text-sm tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-white/55 min-h-[44px]"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default PageHero;
