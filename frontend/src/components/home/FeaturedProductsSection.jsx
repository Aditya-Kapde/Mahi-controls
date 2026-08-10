import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../ui/ProductCard";
import { Loader2 } from "lucide-react";
import { api } from "../../services/api";

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
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await api.getProducts({ featured: true, size: 6 });
        setProducts(response.content || []);
      } catch (error) {
        console.error("Failed to fetch featured products", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeatured();
  }, []);

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

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-10 h-10 text-[#F97316] animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Loading featured products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No featured products available at the moment.
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  title: product.title,
                  category: product.categoryName || 'General',
                  image: product.images && product.images.length > 0 ? product.images[0].imageUrl : 'https://placehold.co/600x400/F8FAFC/334155?text=No+Image',
                  description: product.shortDescription || product.fullDescription || '',
                  slug: product.slug
                }}
                ctaLabel="Learn More"
                ctaTo={`/products`}
                variants={cardVariants}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProductsSection;
