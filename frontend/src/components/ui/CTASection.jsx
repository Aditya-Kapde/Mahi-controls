import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

function CTASection({
  eyebrow,
  heading,
  description,
  primaryCta,
  secondaryCta,
  features,
}) {
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

  const hasFeatures = features && features.length > 0;

  return (
    <section className="w-full bg-[#0B192C] py-24 z-10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#FFFFFF_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={clsx(
            hasFeatures
              ? "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
              : "max-w-3xl mx-auto text-center"
          )}
        >
          <div className={clsx(hasFeatures && "lg:col-span-7")}>
            {eyebrow && (
              <motion.p
                variants={itemVariants}
                className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-4"
              >
                {eyebrow}
              </motion.p>
            )}

            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white leading-tight tracking-tight mb-4"
            >
              {heading}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className={clsx(
                "text-[#CBD5E1] text-base md:text-lg leading-relaxed mb-8",
                hasFeatures && "max-w-2xl"
              )}
            >
              {description}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className={clsx(
                "flex flex-col sm:flex-row gap-4",
                !hasFeatures && "items-center justify-center"
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
          </div>

          {hasFeatures && (
            <div className="lg:col-span-5">
              <ul className="space-y-4">
                {features.map((item) => (
                  <motion.li
                    key={item.title}
                    variants={itemVariants}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10 transition-all duration-300 select-none group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F97316]/10 flex items-center justify-center border border-[#F97316]/20 text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <span className="font-bold text-white text-base md:text-lg group-hover:text-[#F97316] transition-colors duration-200">
                      {item.title}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
