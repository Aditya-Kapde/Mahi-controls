import { motion } from "framer-motion";
import {
  ShieldCheck,
  ClipboardList,
  Handshake,
  Headphones,
  Target,
  Eye,
  Scale,
  BadgeCheck,
  Users,
} from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import CTASection from "../components/ui/CTASection";
import factoryInterior from "../assets/factory_interior.png";

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

const focusAreas = [
  {
    title: "Genuine Product Sourcing",
    description:
      "Identifying and procuring industrial products from established manufacturers based on your specifications and application requirements.",
    icon: ShieldCheck,
  },
  {
    title: "Technical Procurement Support",
    description:
      "Reviewing technical parameters, compatibility needs, and documentation to help align products with your engineering requirements.",
    icon: ClipboardList,
  },
  {
    title: "Reliable Supplier Network",
    description:
      "Coordinating with qualified suppliers to evaluate product availability, lead times, and commercial terms.",
    icon: Handshake,
  },
  {
    title: "Responsive Customer Support",
    description:
      "Providing clear communication and follow-up support throughout the sourcing and procurement process.",
    icon: Headphones,
  },
];

const coreValues = [
  {
    title: "Reliability",
    description: "Consistent follow-through on requirements, quotations, and order coordination.",
    icon: BadgeCheck,
  },
  {
    title: "Technical Understanding",
    description: "Attention to specifications, compatibility, and application context in every inquiry.",
    icon: Target,
  },
  {
    title: "Transparency",
    description: "Clear communication on product options, terms, and next steps.",
    icon: Scale,
  },
  {
    title: "Quality Focus",
    description: "Emphasis on appropriate product selection and documentation verification where applicable.",
    icon: ShieldCheck,
  },
  {
    title: "Customer Commitment",
    description: "Support that extends from initial inquiry through delivery and follow-up.",
    icon: Users,
  },
];

function About() {
  return (
    <MainLayout>
      <PageHero
        eyebrow="About Mahi Controls"
        title="Engineering Procurement Built on Reliability"
        description="Mahi Controls is an industrial sourcing and procurement partner helping businesses source machinery, automation systems, electrical components, and spare parts with clarity and technical attention."
      />

      <section className="w-full bg-[#F8FAFC] py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <SectionHeader
                eyebrow="Company Overview"
                title="Your Partner in Industrial Product Sourcing"
                description="We help manufacturers, contractors, and procurement teams source industrial machinery, automation products, electrical systems, and engineering components. Our role is to simplify procurement by combining technical review, supplier coordination, and responsive support."
                align="left"
                className="mb-0"
              />
              <p className="text-[#334155] text-base md:text-lg leading-relaxed mt-6">
                Whether you need a specific OEM component, plant equipment, or automation hardware,
                Mahi Controls works to understand your requirement and coordinate sourcing
                through a structured, transparent process.
              </p>
            </motion.div>

            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="relative group overflow-hidden rounded-2xl shadow-xl border border-slate-200/50 aspect-[4/3] lg:aspect-square">
                <img
                  src={factoryInterior}
                  alt="Industrial warehouse and manufacturing facility"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/50 via-transparent to-[#0F172A]/10 pointer-events-none opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#F97316]" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionHeader
            eyebrow="What We Focus On"
            title="Core Capabilities That Support Your Procurement"
            description="Our work centers on practical sourcing support—connecting requirements with suitable products and coordinated supplier options."
            align="center"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {focusAreas.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="relative group bg-[#F8FAFC]/50 hover:bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl p-8 flex gap-5 shadow-md hover:shadow-xl hover:shadow-slate-100/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-transparent group-hover:bg-[#F97316] transition-all duration-300 rounded-l-2xl" />
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white group-hover:scale-105 transition-all duration-300">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] tracking-tight mb-2 group-hover:text-[#F97316] transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-[#334155] text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-[#F8FAFC] py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionHeader
            eyebrow="Mission & Vision"
            title="Purpose That Guides Our Work"
            align="center"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-md hover:shadow-xl hover:border-slate-300 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 text-[#F97316] mb-6">
                <Target className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] tracking-tight mb-3">Mission</h3>
              <p className="text-[#334155] text-sm md:text-base leading-relaxed">
                To help businesses source industrial products and engineering components with
                technical clarity, dependable coordination, and responsive support.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-md hover:shadow-xl hover:border-slate-300 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 text-[#F97316] mb-6">
                <Eye className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] tracking-tight mb-3">Vision</h3>
              <p className="text-[#334155] text-sm md:text-base leading-relaxed">
                To be a trusted industrial sourcing partner recognized for reliability,
                technical understanding, and professional procurement support across engineering sectors.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionHeader
            eyebrow="Core Values"
            title="Principles Behind Every Engagement"
            align="center"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {coreValues.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="bg-[#F8FAFC]/50 border border-slate-200/80 rounded-2xl p-6 hover:border-slate-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center border border-orange-100 text-[#F97316] mb-4">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A] tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#334155] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <CTASection
        heading="Looking for a Reliable Industrial Sourcing Partner?"
        description="Share your machinery, automation, electrical, or spare-parts requirement with our team. We will review your needs and respond with the next steps."
        primaryCta={{ label: "Request a Quote", to: "/rfq" }}
        secondaryCta={{ label: "Contact Our Team", to: "/contact" }}
      />
    </MainLayout>
  );
}

export default About;
