import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Home } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";

function NotFound() {
  return (
    <MainLayout>
      <section className="w-full bg-[#F8FAFC] py-24 md:py-32 border-t border-slate-100 min-h-[calc(100vh-20rem)] flex items-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="text-6xl md:text-8xl font-extrabold text-[#F97316] tracking-tight mb-4">
              404
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-4">
              Page Not Found
            </h1>
            <p className="text-[#334155] text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              The page you&apos;re looking for may have moved or no longer exists.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F97316] hover:bg-orange-600 active:scale-95 text-white font-bold rounded-full shadow-md hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 text-sm tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] min-h-[44px] w-full sm:w-auto"
              >
                <Home className="h-4 w-4" aria-hidden="true" />
                Return Home
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-[#0F172A] font-bold rounded-full shadow-sm transition-all duration-300 text-sm tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] min-h-[44px] w-full sm:w-auto"
              >
                Explore Products
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}

export default NotFound;
