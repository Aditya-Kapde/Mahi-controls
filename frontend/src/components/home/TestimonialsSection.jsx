import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

// Animated counter component helper
function AnimatedCounter({ value, duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const numericValue = parseFloat(value);
  const isFloat = value.includes(".");
  const suffix = value.replace(numericValue.toString(), "");

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      if (isFloat) {
        setCount((progress * numericValue).toFixed(1));
      } else {
        setCount(Math.floor(progress * numericValue));
      }
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(numericValue);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, numericValue, duration, isFloat]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function TestimonialsSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const testimonials = [
    {
      quote: "IndusSource has been a key sourcing partner for our highway expansion project. Their supply of asphalt plant spares minimized our downtime, and delivery was prompt across all regional work sites.",
      name: "Rajesh Mehta",
      title: "Senior Procurement Director",
      company: "Som Infra Projects",
      logoText: "SOM INFRA",
    },
    {
      quote: "We modernized our automotive assembly panels using automated PLC controllers sourced by their engineering experts. The technical compatibility checks they did saved us weeks of review.",
      name: "Aravind Sharma",
      title: "Head of Automation",
      company: "Varroc Industries",
      logoText: "VARROC",
    },
    {
      quote: "Finding genuine manufacturer replacement parts for mining loaders is always a bottleneck. IndusSource supplied 100% genuine OEM components at competitive prices. Highly recommended.",
      name: "Sanjay Singhal",
      title: "VP Sourcing & Equipment",
      company: "Rajasthan Mines & Minerals",
      logoText: "RMM GROUP",
    },
  ];

  const trustMetrics = [
    { value: "150+", label: "Happy Clients" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "98%", label: "Repeat Business" },
    { value: "24", label: "Hour RFQ Response", suffix: " Hour" },
  ];

  return (
    <section className="w-full bg-[#F8FAFC] py-24 border-t border-slate-100 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        
        {/* Section Heading & Subtext */}
        <div className="text-center mb-16">
          <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-4">
            Client Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#0F172A] leading-tight tracking-tight mb-4">
            Trusted by Engineering Teams Across India
          </h2>
          <p className="text-[#334155] text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Our clients rely on us for genuine industrial products, responsive sourcing support, 
            and dependable nationwide delivery.
          </p>
        </div>

        {/* 3-Column Testimonial Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {testimonials.map((item) => (
            <motion.div
              key={item.name}
              variants={cardVariants}
              className="relative group bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl p-8 flex flex-col justify-between shadow-md hover:shadow-xl hover:shadow-slate-100/50 hover:-translate-y-1 transition-all duration-300 select-none"
            >
              {/* Top Accent Orange Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#F97316] transition-all duration-300 rounded-t-2xl" />

              <div>
                {/* 5 Star rating */}
                <div className="flex gap-1 text-[#F97316] mb-4">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                
                {/* Quotation text */}
                <p className="text-[#334155] text-sm md:text-base leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Bottom detail card row */}
              <div className="pt-6 border-t border-slate-100/60 flex items-center justify-between mt-auto">
                <div>
                  <h4 className="font-bold text-[#0F172A] text-sm md:text-base">{item.name}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold tracking-wide">
                    {item.title}, {item.company}
                  </p>
                </div>
                {/* Minimal typographic placeholder logo */}
                <div className="text-slate-400 font-extrabold tracking-widest text-[9px] uppercase select-none opacity-40 group-hover:opacity-80 transition-opacity duration-200">
                  {item.logoText}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lower Trust Metrics Row */}
        <div className="pt-16 border-t border-slate-200/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {trustMetrics.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="text-4xl md:text-5xl font-extrabold text-[#F97316] tracking-tight">
                  <AnimatedCounter value={stat.value} />
                  {stat.suffix && <span className="text-2xl font-bold">{stat.suffix}</span>}
                </div>
                <div className="text-xs md:text-sm font-bold text-[#0F172A] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default TestimonialsSection;
