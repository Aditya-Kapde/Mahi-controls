import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function ApplicationCard({ application, ctaLabel, ctaTo, variants }) {
  return (
    <motion.article
      variants={variants}
      className="group bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-slate-100/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between select-none"
    >
      <div className="relative overflow-hidden aspect-[16/10] bg-slate-50 border-b border-slate-100">
        <img
          src={application.image}
          alt={`Mahi Controls application area: ${application.title}`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="p-8 flex flex-col justify-between flex-1">
        <div>
          <p className="text-xs font-bold text-[#F97316] uppercase tracking-wider mb-2">
            {application.category}
          </p>
          <h3 className="text-lg md:text-xl font-bold text-[#0F172A] tracking-tight mb-3 group-hover:text-[#F97316] transition-colors duration-200">
            {application.title}
          </h3>
          <p className="text-[#334155] text-sm leading-relaxed mb-6">
            {application.description}
          </p>
        </div>

        {ctaLabel && ctaTo && (
          <div className="pt-4 border-t border-slate-100/60 flex items-center justify-between">
            <Link
              to={ctaTo}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F172A] group-hover:text-[#F97316] uppercase tracking-wider transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] rounded"
            >
              {ctaLabel}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default ApplicationCard;
