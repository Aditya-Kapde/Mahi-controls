import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import CTASection from "../components/ui/CTASection";
import BrandGrid from "../components/ui/BrandGrid";
import {
  BRAND_DISCLAIMER,
  SOURCING_CATEGORIES,
} from "../constants/brands";

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

function Partners() {
  return (
    <MainLayout>
      <PageHero
        eyebrow="Brands We Source"
        title="Access to Leading Industrial Manufacturers"
        description="Mahi Controls helps customers source industrial products and components from established manufacturers based on their specifications, application requirements, and procurement needs."
      />

      <section className="w-full bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionHeader
            eyebrow="Manufacturer Brands"
            title="Products from Recognized Industrial Manufacturers"
            description="The brands below represent manufacturers whose products may be sourced based on customer requirements. Inclusion does not indicate an official partnership or authorized distributorship."
            align="center"
          />

          <BrandGrid />

          <p className="mt-12 max-w-4xl mx-auto text-center text-xs md:text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-8">
            {BRAND_DISCLAIMER}
          </p>
        </div>
      </section>

      <section className="w-full bg-[#F8FAFC] py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionHeader
            eyebrow="Sourcing Categories"
            title="Product Categories We Help Source"
            description="Our sourcing support spans a range of industrial product categories based on your technical and commercial requirements."
            align="center"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SOURCING_CATEGORIES.map((category) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-md hover:shadow-lg hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-[#0F172A] tracking-tight mb-2">
                  {category.title}
                </h3>
                <p className="text-[#334155] text-sm leading-relaxed">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection
        heading="Looking for a Specific Brand or Component?"
        description="Share the manufacturer, part number, or product category you need. Our sourcing team will review your requirement and respond with available options."
        primaryCta={{ label: "Request a Quote", to: "/rfq" }}
        secondaryCta={{ label: "Contact Our Team", to: "/contact" }}
      />
    </MainLayout>
  );
}

export default Partners;
