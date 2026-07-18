import { motion } from "framer-motion";
import { BRANDS } from "../../constants/brands";

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

function BrandLogo({ name }) {
  switch (name) {
    case "CAT":
      return (
        <span className="text-3xl font-extrabold tracking-tighter italic text-[#0F172A]">
          CAT<span className="text-[#F97316] not-italic">▲</span>
        </span>
      );
    case "Volvo":
      return (
        <span className="text-2xl font-bold tracking-[0.15em] uppercase text-slate-800 font-serif">
          VOLVO
        </span>
      );
    case "Siemens":
      return (
        <span className="text-2xl font-bold tracking-wide text-slate-900 font-sans">
          SIEMENS
        </span>
      );
    case "ABB":
      return (
        <span className="text-3xl font-black tracking-tighter text-slate-900">
          ABB
        </span>
      );
    case "Schneider Electric":
      return (
        <span className="text-xl font-bold tracking-tight text-slate-800">
          Schneider <span className="font-light text-slate-500">Electric</span>
        </span>
      );
    case "Cummins":
      return (
        <span className="text-2xl font-black tracking-tight italic text-[#0F172A]">
          Cummins
        </span>
      );
    case "Atlas Copco":
      return (
        <span className="text-lg font-extrabold tracking-widest uppercase text-slate-800">
          Atlas Copco
        </span>
      );
    case "Bosch Rexroth":
      return (
        <div className="flex flex-col items-center leading-none">
          <span className="text-lg font-bold text-slate-950 tracking-wider">BOSCH</span>
          <span className="text-[10px] font-medium tracking-[0.25em] text-slate-500 mt-1 uppercase">
            Rexroth
          </span>
        </div>
      );
    default:
      return (
        <span className="text-lg font-bold text-slate-800">{name}</span>
      );
  }
}

function BrandGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6"
      role="list"
      aria-label="Industrial manufacturer brands"
    >
      {BRANDS.map((brand) => (
        <motion.div
          key={brand.name}
          variants={cardVariants}
          role="listitem"
          className="bg-white border border-slate-200/80 rounded-2xl p-8 flex items-center justify-center min-h-[112px] shadow-md hover:shadow-xl hover:shadow-slate-100/50 hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 cursor-default select-none group"
          aria-label={`${brand.name} brand name`}
        >
          <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            <BrandLogo name={brand.name} />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default BrandGrid;
