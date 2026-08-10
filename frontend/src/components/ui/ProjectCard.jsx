import { motion } from "framer-motion";
import { MapPin, Image as ImageIcon } from "lucide-react";

function ProjectCard({ proj, variants }) {
  return (
    <motion.div
      variants={variants}
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group transition-shadow hover:shadow-md h-full"
    >
      <div className="h-48 bg-slate-100 relative overflow-hidden border-b border-slate-100 shrink-0">
        {proj.primaryImageUrl ? (
          <img src={proj.primaryImageUrl} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center"><ImageIcon className="w-8 h-8 text-slate-300" /></div>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-900 font-poppins leading-tight group-hover:text-[#F97316] transition-colors">{proj.title}</h3>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded shrink-0 ml-2">{proj.completionYear}</span>
        </div>
        <p className="text-xs font-medium text-[#F97316] mb-3 flex items-center gap-1"><MapPin className="w-3 h-3" /> {proj.location}</p>
        <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-1">{proj.summary}</p>
        
        <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-500"><span className="font-semibold text-slate-700">Client:</span> {proj.clientName}</p>
          {proj.equipmentSupplied && (
            <p className="text-xs text-slate-500 line-clamp-2"><span className="font-semibold text-slate-700">Equipment:</span> {proj.equipmentSupplied}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
