import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";

function HeroButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
      <Link
        to="/rfq"
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F97316] hover:bg-orange-600 active:scale-95 text-white font-bold rounded-full shadow-md hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 text-sm tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] min-h-[44px]"
      >
        Request a Quote
        <ArrowRight className="h-4 w-4" />
      </Link>
      
      <Link
        to="/products"
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold rounded-full backdrop-blur-xs active:scale-95 transition-all duration-300 text-sm tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-white/55 min-h-[44px]"
      >
        Explore Products
        <ArrowDown className="h-4 w-4" />
      </Link>
    </div>
  );
}

export default HeroButtons;
