import { motion } from "framer-motion";
import ApplicationCard from "../ui/ApplicationCard";
import { HOMEPAGE_APPLICATION_AREAS } from "../../constants/products";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

function FeaturedProjectsSection() {
  return (
    <section className="w-full bg-white py-24 border-t border-slate-100 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="text-center mb-16">
          <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-4">
            Solutions & Applications
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#0F172A] leading-tight tracking-tight mb-4">
            Engineering Solutions Across Critical Industries
          </h2>
          <p className="text-[#334155] text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            From highway infrastructure to industrial automation, our sourcing capabilities
            support critical engineering applications across multiple industries.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {HOMEPAGE_APPLICATION_AREAS.map((application) => (
            <ApplicationCard
              key={application.title}
              application={application}
              ctaLabel="Explore Solution"
              ctaTo="/expertise"
              variants={cardVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedProjectsSection;
