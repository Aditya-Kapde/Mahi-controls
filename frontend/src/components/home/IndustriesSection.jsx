import { motion } from "framer-motion";
import roadImg from "../../assets/industries/road_construction.png";
import miningImg from "../../assets/industries/mining.png";
import manufacturingImg from "../../assets/industries/manufacturing.png";
import automationImg from "../../assets/industries/industrial_automation.png";
import electricalImg from "../../assets/industries/power_electrical.png";
import infraImg from "../../assets/industries/infrastructure.png";

function IndustriesSection() {
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

  const industries = [
    {
      title: "Road Construction",
      description: "Supplying asphalt batching plants, paving components, compaction equipment and high-durability replacement parts.",
      image: roadImg,
    },
    {
      title: "Mining",
      description: "Sourcing heavy excavation machinery, processing system spares and rugged components for raw material extraction.",
      image: miningImg,
    },
    {
      title: "Manufacturing",
      description: "Supporting modern manufacturing facilities with custom spare parts procurement and plant maintenance solutions.",
      image: manufacturingImg,
    },
    {
      title: "Industrial Automation",
      description: "Procuring advanced PLC systems, sensors, motion controllers, and HMIs for automated assembly operations.",
      image: automationImg,
    },
    {
      title: "Power & Electrical",
      description: "Sourcing standard industrial electrical panel boards, switchgear, distribution units and safety controllers.",
      image: electricalImg,
    },
    {
      title: "Infrastructure",
      description: "Partnering with massive EPC contractors to source customized heavy systems and machinery for critical national projects.",
      image: infraImg,
    },
  ];

  return (
    <section className="w-full bg-white py-24 border-t border-slate-100 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        
        {/* Section Heading & Subtext */}
        <div className="text-center mb-16">
          <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-4">
            Industries We Serve
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#0F172A] leading-tight tracking-tight mb-4">
            Supporting Critical Industries Across India
          </h2>
          <p className="text-[#334155] text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            We support manufacturers, EPC contractors, infrastructure companies and industrial
            facilities with reliable engineering products and sourcing solutions.
          </p>
        </div>

        {/* Responsive Grid of Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {industries.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl hover:shadow-slate-100/50 hover:-translate-y-1 transition-all duration-300 aspect-[4/3] w-full cursor-pointer select-none"
            >
              {/* Card Image */}
              <img
                src={item.image}
                alt={`Mahi Controls industry: ${item.title}`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              
              {/* Dark Linear Gradient Overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

              {/* absolute Content wrapper */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-left z-10">
                {/* Accent Highlight Line above Title */}
                <div className="w-8 h-1 bg-[#F97316] mb-3 transform origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-300" />
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-[#F97316] transition-colors duration-200">
                  {item.title}
                </h3>
                
                <p className="text-slate-200 text-xs md:text-sm leading-relaxed font-normal opacity-90">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default IndustriesSection;
