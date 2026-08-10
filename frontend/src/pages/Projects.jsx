import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Factory,
  Package,
  Cpu,
  Wrench,
  ClipboardList,
  Truck,
  ArrowRight,
  MapPin,
  Loader2,
  Image as ImageIcon
} from "lucide-react";
import { api } from "../services/api";
import MainLayout from "../components/layout/MainLayout";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import CTASection from "../components/ui/CTASection";
import ApplicationCard from "../components/ui/ApplicationCard";
import ProjectCard from "../components/ui/ProjectCard";
import {
  APPLICATION_AREAS,
  REQUIREMENT_SUPPORT_AREAS,
} from "../constants/products";

const supportIcons = {
  "Machinery Sourcing": Factory,
  "Component Procurement": Package,
  "Automation & Electrical Sourcing": Cpu,
  "Spare Parts Identification": Wrench,
  "Technical Requirement Coordination": ClipboardList,
  "Delivery Coordination": Truck,
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

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.getProjects({ size: 100 });
        setProjects(response.content || []);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <MainLayout>
      <PageHero
        eyebrow="Solutions & Applications"
        title="Industrial Sourcing Support Across Critical Applications"
        description="Mahi Controls supports sourcing requirements across infrastructure, manufacturing, automation, electrical, mining, and machinery-related applications—helping teams identify and procure suitable products."
      />

      <section className="w-full bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionHeader
            eyebrow="Application Areas"
            title="Where Our Sourcing Support Applies"
            description="These application areas describe the types of requirements we help coordinate. They represent sourcing capabilities, not verified completed projects."
            align="center"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {APPLICATION_AREAS.map((application) => (
              <ApplicationCard
                key={application.title}
                application={application}
                variants={itemVariants}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-[#F8FAFC] py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionHeader
            eyebrow="How We Support Requirements"
            title="Structured Support for Your Sourcing Needs"
            description="Our team coordinates technical review, supplier options, and procurement steps based on your application and delivery requirements."
            align="center"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {REQUIREMENT_SUPPORT_AREAS.map((item) => {
              const Icon = supportIcons[item.title] || Package;
              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="relative group bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl p-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center border border-orange-100 text-[#F97316] mb-4 group-hover:bg-[#F97316] group-hover:text-white transition-all duration-300">
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

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-12 text-center"
          >
            <p className="text-[#334155] text-sm md:text-base mb-4">
              Want to understand our full sourcing process?
            </p>
            <Link
              to="/how-we-work"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#F97316] hover:text-orange-600 uppercase tracking-wider transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] rounded"
            >
              View How We Work
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionHeader
            eyebrow="Case Studies"
            title="Recent Sourcing Projects"
            description="Explore our track record of successfully fulfilled industrial requirements."
            align="center"
          />

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-10 h-10 text-[#F97316] animate-spin mb-4" />
              <p className="text-slate-500 font-medium">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <p className="text-center text-[#334155] text-sm py-12">
              No recent projects available.
            </p>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((proj) => (
                <ProjectCard key={proj.id} proj={proj} variants={itemVariants} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <CTASection
        heading="Have a Project or Procurement Requirement?"
        description="Share your machinery, automation, electrical, or spare-parts sourcing requirement. Our team will review your needs and respond with the next steps."
        primaryCta={{ label: "Request a Quote", to: "/rfq" }}
        secondaryCta={{ label: "How We Work", to: "/how-we-work" }}
      />
    </MainLayout>
  );
}

export default Projects;
