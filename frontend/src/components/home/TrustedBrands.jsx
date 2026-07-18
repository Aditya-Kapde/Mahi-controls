import { motion } from "framer-motion";

function TrustedBrands() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
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

  const brands = [
    {
      name: "CAT",
      logo: (
        <span className="text-3xl font-extrabold tracking-tighter italic text-[#0F172A]">
          CAT<span className="text-[#F97316] not-italic">▲</span>
        </span>
      ),
    },
    {
      name: "Volvo",
      logo: (
        <span className="text-2xl font-bold tracking-[0.15em] uppercase text-slate-800 font-serif">
          VOLVO
        </span>
      ),
    },
    {
      name: "Siemens",
      logo: (
        <span className="text-2xl font-bold tracking-wide text-slate-900 font-sans">
          SIEMENS
        </span>
      ),
    },
    {
      name: "ABB",
      logo: (
        <span className="text-3xl font-black tracking-tighter text-slate-900">
          ABB
        </span>
      ),
    },
    {
      name: "Schneider Electric",
      logo: (
        <span className="text-xl font-bold tracking-tight text-slate-800">
          Schneider <span className="font-light text-slate-500">Electric</span>
        </span>
      ),
    },
    {
      name: "Cummins",
      logo: (
        <span className="text-2xl font-black tracking-tight italic text-[#0F172A]">
          Cummins
        </span>
      ),
    },
    {
      name: "Atlas Copco",
      logo: (
        <span className="text-lg font-extrabold tracking-widest uppercase text-slate-800">
          Atlas Copco
        </span>
      ),
    },
    {
      name: "Bosch Rexroth",
      logo: (
        <div className="flex flex-col items-center leading-none">
          <span className="text-lg font-bold text-slate-950 tracking-wider">BOSCH</span>
          <span className="text-[10px] font-medium tracking-[0.25em] text-slate-500 mt-1 uppercase">
            Rexroth
          </span>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full bg-white py-24 border-t border-slate-100 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        
        {/* Section Heading & Subtitle */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            Products from Leading Industrial Brands
          </h2>
          <p className="text-[#334155] text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            We source industrial equipment, components and automation solutions from globally recognized manufacturers.
          </p>
        </div>

        {/* Staggered Brand Logo Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.name}
              variants={cardVariants}
              className="bg-white border border-slate-200/80 rounded-2xl p-8 flex items-center justify-center min-h-[112px] shadow-md hover:shadow-xl hover:shadow-slate-100/50 hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 cursor-default select-none group"
              aria-label={`${brand.name} logo`}
            >
              <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                {brand.logo}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default TrustedBrands;
