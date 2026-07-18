import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import MainLayout from "../components/layout/MainLayout";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import CTASection from "../components/ui/CTASection";
import ProductCard from "../components/ui/ProductCard";
import {
  FEATURED_PRODUCTS,
  PRODUCT_CATEGORIES,
  PRODUCT_FILTER_CATEGORIES,
} from "../constants/products";

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
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProducts =
    activeFilter === "All"
      ? FEATURED_PRODUCTS
      : FEATURED_PRODUCTS.filter(
          (product) => product.filterCategory === activeFilter
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
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {PRODUCT_CATEGORIES.map((category) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="bg-[#F8FAFC]/50 border border-slate-200/80 rounded-2xl p-8 hover:border-slate-300 hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-[#0F172A] tracking-tight mb-3">
                  {category.title}
                </h3>
                <p className="text-[#334155] text-sm leading-relaxed mb-6">
                  {category.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-[#334155]"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-[#F97316] flex-shrink-0"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
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
            {PRODUCT_FILTER_CATEGORIES.map((filter) => (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className={clsx(
                  "px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]",
                  activeFilter === filter
                    ? "bg-[#F97316] text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-[#0F172A]"
                )}
              >
                {filter}
              </button>
            ))}
          </div>

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
                key={product.title}
                product={product}
                ctaLabel="Request Quote"
                ctaTo="/rfq"
                variants={itemVariants}
              />
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <p className="text-center text-[#334155] text-sm">
              No products match this filter. Try another category or send your requirement directly.
            </p>
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
