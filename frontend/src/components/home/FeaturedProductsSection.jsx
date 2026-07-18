import { motion } from "framer-motion";
import ProductCard from "../ui/ProductCard";
import { FEATURED_PRODUCTS } from "../../constants/products";

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

function FeaturedProductsSection() {
  return (
    <section className="w-full bg-[#F8FAFC] py-24 border-t border-slate-100 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="text-center mb-16">
          <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-4">
            Featured Products
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#0F172A] leading-tight tracking-tight mb-4">
            Engineering Products from Trusted Global Manufacturers
          </h2>
          <p className="text-[#334155] text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            From industrial automation to heavy machinery spare parts, we source genuine engineering
            products from globally recognized manufacturers.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {FEATURED_PRODUCTS.slice(0, 6).map((product) => (
            <ProductCard
              key={product.title}
              product={product}
              ctaLabel="Learn More"
              ctaTo="/products"
              variants={cardVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedProductsSection;
