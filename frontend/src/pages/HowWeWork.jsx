import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import CTASection from "../components/ui/CTASection";

const processSteps = [
  {
    step: "01",
    title: "Submit Your Requirement",
    description:
      "Share product specifications, quantities, application details, and delivery requirements through our RFQ or contact channels.",
  },
  {
    step: "02",
    title: "Technical Review",
    description:
      "Our team reviews your requirement against technical parameters, compatibility needs, and the scope of sourcing.",
  },
  {
    step: "03",
    title: "Product & Supplier Sourcing",
    description:
      "We identify suitable products and evaluate qualified suppliers from our vendor network.",
  },
  {
    step: "04",
    title: "Quotation",
    description:
      "You receive a structured quotation covering product details, commercial terms, and indicative delivery timelines.",
  },
  {
    step: "05",
    title: "Procurement & Quality Verification",
    description:
      "Upon approval, we coordinate procurement and verify product authenticity and documentation where applicable.",
  },
  {
    step: "06",
    title: "Dispatch & Delivery",
    description:
      "Orders are prepared for dispatch with logistics coordination to your designated delivery location.",
  },
  {
    step: "07",
    title: "After-Sales Support",
    description:
      "Our team remains available for follow-up inquiries, replacement parts guidance, and ongoing procurement support.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const stepVariants = {
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

function HowWeWork() {
  return (
    <MainLayout>
      <PageHero
        eyebrow="How We Work"
        title="A Clear Process from Requirement to Delivery"
        description="Mahi Controls simplifies industrial procurement through a structured sourcing process—keeping requirements clear, options evaluated, and orders managed with transparency."
      />

      <section className="w-full bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionHeader
            eyebrow="Our Process"
            title="Seven Steps to Confident Procurement"
            description="Each stage is designed to move your requirement forward with clarity—from initial submission through sourcing, quotation, and delivery."
            align="center"
          />

          <motion.ol
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative max-w-4xl mx-auto space-y-8"
            aria-label="Mahi Controls sourcing process"
          >
            <div
              className="absolute left-[23px] top-4 bottom-4 w-px bg-slate-200 hidden sm:block"
              aria-hidden="true"
            />

            {processSteps.map((item) => (
              <motion.li
                key={item.step}
                variants={stepVariants}
                className="relative flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8"
              >
                <div className="flex-shrink-0 flex items-center gap-4 sm:block sm:w-12">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F172A] text-sm font-extrabold text-white border-2 border-white shadow-md ring-1 ring-slate-200 relative z-10"
                    aria-hidden="true"
                  >
                    {item.step}
                  </span>
                </div>

                <div className="flex-1 bg-[#F8FAFC]/50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-300">
                  <h3 className="text-lg md:text-xl font-bold text-[#0F172A] tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#334155] text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      <CTASection
        heading="Have an Industrial Sourcing Requirement?"
        description="Share your machinery, component, automation, or spare-parts requirement with our sourcing team. We will review your needs and respond with the next steps."
        primaryCta={{ label: "Request a Quote", to: "/rfq" }}
        secondaryCta={{ label: "Contact Our Team", to: "/contact" }}
      />
    </MainLayout>
  );
}

export default HowWeWork;
