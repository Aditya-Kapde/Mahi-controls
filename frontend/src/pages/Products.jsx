import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import MainLayout from "../components/layout/MainLayout";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import CTASection from "../components/ui/CTASection";
import ProductCard from "../components/ui/ProductCard";
import { Loader2 } from "lucide-react";
import { api } from "../services/api";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function Products() {
  const [activeCategoryId, setActiveCategoryId] = useState("All");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [cats, prods] = await Promise.all([
          api.getCategories(),
          api.getProducts({ size: 100 })
        ]);
        setCategories(cats || []);
        setProducts(prods.content || []);
      } catch (err) {
        console.error("Failed to fetch products page data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const filteredProducts =
    activeCategoryId === "All"
      ? products
      : products.filter(
          (product) => product.categoryId === activeCategoryId
        );

  return (
    <MainLayout>
      <PageHero
        eyebrow="Products & Components"
        title="Industrial Products for Critical Engineering Requirements"
        description="Mahi Controls helps businesses source machinery, automation products, electrical systems, industrial components, and spare parts based on technical specifications and application requirements."
      />

      <section className="w-full bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionHeader
            eyebrow="Product Categories"
            title="Sourcing Across Key Industrial Product Groups"
            description="Products are sourced based on your requirements. Listing a category or product type does not indicate inventory availability."
            align="center"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="bg-[#F8FAFC]/50 border border-slate-200/80 rounded-2xl p-8 hover:border-slate-300 hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-[#0F172A] tracking-tight mb-3">
                  {category.name}
                </h3>
                <p className="text-[#334155] text-sm leading-relaxed mb-6">
                  {category.description || 'Explore our sourcing options in this category.'}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-[#F8FAFC] py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionHeader
            eyebrow="Browse Products"
            title="Products Available for Sourcing"
            description="Share specifications for any product below and our team will review sourcing options. Products are procured based on confirmed requirements."
            align="center"
          />

          <div
            className="flex flex-wrap justify-center gap-2 mb-12 px-1"
            role="tablist"
            aria-label="Filter products by category"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategoryId === "All"}
              onClick={() => setActiveCategoryId("All")}
              className={clsx(
                "px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]",
                activeCategoryId === "All"
                  ? "bg-[#F97316] text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-[#0F172A]"
              )}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategoryId === cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
                className={clsx(
                  "px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]",
                  activeCategoryId === cat.id
                    ? "bg-[#F97316] text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-[#0F172A]"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-10 h-10 text-[#F97316] animate-spin mb-4" />
              <p className="text-slate-500 font-medium">Loading products...</p>
            </div>
          ) : (
            <>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                role="tabpanel"
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      title: product.title,
                      category: product.categoryName || 'General',
                      image: product.images && product.images.length > 0 ? product.images[0].imageUrl : 'https://placehold.co/600x400/F8FAFC/334155?text=No+Image',
                      description: product.shortDescription || product.fullDescription || '',
                      slug: product.slug
                    }}
                    ctaLabel="Request Quote"
                    ctaTo={`/rfq?product=${product.slug}`}
                    variants={itemVariants}
                  />
                ))}
              </motion.div>

              {filteredProducts.length === 0 && (
                <p className="text-center text-[#334155] text-sm py-12">
                  No active products match this category. Try another category or send your requirement directly.
                </p>
              )}
            </>
          )}
        </div>
      </section>

      <CTASection
        heading="Can't Find the Product You Need?"
        description="Share your technical specifications, part numbers, or sourcing requirements. Our team will review your inquiry and respond with available options."
        primaryCta={{ label: "Send Your Requirement", to: "/rfq" }}
        secondaryCta={{ label: "Contact Our Team", to: "/contact" }}
      />
    </MainLayout>
  );
}

export default Products;
