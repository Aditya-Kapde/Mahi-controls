import { motion } from "framer-motion";
import { Factory, Cpu, Layers, Wrench } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import CTASection from "../components/ui/CTASection";
import IndustriesSection from "../components/home/IndustriesSection";
import {
  EXPERTISE_CATEGORIES,
  TECHNICAL_SOURCING_STEPS,
} from "../constants/expertiseCategories";

const categoryIcons = {
  "Industrial Machinery": Factory,
  "Automation Systems": Cpu,
  "Electrical Systems": Layers,
  "Genuine Spare Parts": Wrench,
};

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

function Expertise() {
  return (
    <MainLayout>
      <PageHero
        eyebrow="Our Expertise"
        title="Industrial Sourcing Expertise Across Critical Engineering Domains"
        description="Mahi Controls supports procurement across industrial machinery, automation systems, electrical components, and genuine spare parts—helping teams source products aligned with their technical and operational requirements."
      />

      <section className="w-full bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionHeader
            eyebrow="Core Expertise"
            title="Four Domains of Industrial Sourcing"
            description="Each area combines product knowledge with procurement coordination to support engineering and operations teams."
            align="center"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {EXPERTISE_CATEGORIES.map((category) => {
              const Icon = categoryIcons[category.title] || Factory;
              return (
                <motion.article
                  key={category.title}
                  variants={itemVariants}
                  className="relative group bg-gradient-to-br from-white to-[#F8FAFC]/50 border border-slate-200/80 rounded-2xl p-8 hover:shadow-xl hover:shadow-slate-100/50 hover:border-slate-300 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#F97316] transition-all duration-300 rounded-t-2xl" />
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-6">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] tracking-tight mb-3">
                    {category.title}
                  </h3>
                  <p className="text-[#334155] text-sm md:text-base leading-relaxed mb-6">
                    {category.description}
                  </p>
                  <ul className="space-y-2 border-t border-slate-100/60 pt-6">
                    {category.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="flex items-start gap-2 text-sm text-[#334155]"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F97316] flex-shrink-0" aria-hidden="true" />
                        {capability}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-[#F8FAFC] py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionHeader
            eyebrow="Technical Sourcing Support"
            title="How We Support Your Product Requirements"
            description="Beyond product categories, our team provides structured technical sourcing support to help move requirements from inquiry to coordinated procurement."
            align="center"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {TECHNICAL_SOURCING_STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-md hover:shadow-lg hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="text-xs font-extrabold tracking-wider text-[#F97316] uppercase mb-3 block">
                  Step {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold text-[#0F172A] tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-[#334155] text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <IndustriesSection />

      <CTASection
        heading="Need Help Sourcing an Industrial Product?"
        description="Tell us what you need—machinery, automation hardware, electrical components, or spare parts—and our team will review your requirement and respond with the next steps."
        primaryCta={{ label: "Request a Quote", to: "/rfq" }}
        secondaryCta={{ label: "Explore Products", to: "/products" }}
      />
    </MainLayout>
  );
}

export default Expertise;
