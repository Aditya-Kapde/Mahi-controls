import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Factory, Cpu, Layers, Wrench, ArrowRight } from "lucide-react";

function ExpertiseSection() {
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

  const expertiseCards = [
    {
      title: "Industrial Machinery",
      description: "Supply of road construction machinery, mining equipment and heavy industrial machines.",
      icon: <Factory className="h-6 w-6" />,
      path: "/expertise", // or specific page/category
    },
    {
      title: "Automation Systems",
      description: "PLC systems, industrial automation, process control and smart manufacturing solutions.",
      icon: <Cpu className="h-6 w-6" />,
      path: "/expertise",
    },
    {
      title: "Electrical Systems",
      description: "Industrial electrical panels, switchgear, control systems and power distribution.",
      icon: <Layers className="h-6 w-6" />,
      path: "/expertise",
    },
    {
      title: "Genuine Spare Parts",
      description: "OEM spare parts, maintenance components and replacement equipment.",
      icon: <Wrench className="h-6 w-6" />,
      path: "/expertise",
    },
  ];

  return (
    <section className="w-full bg-white py-24 border-t border-slate-100 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        
        {/* Section Heading & Subtext */}
        <div className="text-center mb-16">
          <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-4">
            Our Expertise
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#0F172A] leading-tight tracking-tight mb-4">
            Engineering Solutions Across Multiple Industrial Domains
          </h2>
          <p className="text-[#334155] text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            From heavy construction machinery to industrial automation and genuine OEM spare parts, 
            Mahi Controls delivers reliable sourcing solutions tailored to modern industries.
          </p>
        </div>

        {/* Staggered Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {expertiseCards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              className="relative group bg-gradient-to-br from-white to-[#F8FAFC]/50 border border-slate-200/80 rounded-2xl p-8 flex flex-col justify-between hover:shadow-xl hover:shadow-slate-100/50 hover:border-slate-350 hover:-translate-y-1 transition-all duration-300 cursor-pointer select-none"
            >
              {/* Top Orange Accent Line that lights up on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#F97316] transition-all duration-300 rounded-t-2xl" />

              {/* Icon Container */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-6">
                {card.icon}
              </div>

              {/* Text Block */}
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] tracking-tight mb-3">
                  {card.title}
                </h3>
                <p className="text-[#334155] text-sm md:text-base leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Learn More link */}
              <div className="pt-6 mt-6 border-t border-slate-100/60">
                <Link
                  to={card.path}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F97316] uppercase tracking-wider group-hover:text-orange-600 transition-colors duration-200 focus:outline-none"
                >
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default ExpertiseSection;
