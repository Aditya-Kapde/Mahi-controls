import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Expertise = lazy(() => import("../pages/Expertise"));
const Products = lazy(() => import("../pages/Products"));
const HowWeWork = lazy(() => import("../pages/HowWeWork"));
const Projects = lazy(() => import("../pages/Projects"));
const Partners = lazy(() => import("../pages/Partners"));
const Contact = lazy(() => import("../pages/Contact"));
const RFQ = lazy(() => import("../pages/RFQ"));
const NotFound = lazy(() => import("../pages/NotFound"));

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-[#F8FAFC]">
      <p className="text-sm font-semibold text-slate-500">Loading...</p>
    </div>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/products" element={<Products />} />
          <Route path="/how-we-work" element={<HowWeWork />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rfq" element={<RFQ />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
