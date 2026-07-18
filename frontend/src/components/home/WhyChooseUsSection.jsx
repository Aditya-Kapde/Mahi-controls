import { motion } from "framer-motion";
import { Award, Truck, Handshake, UserCheck, Zap, Headphones } from "lucide-react";

function WhyChooseUsSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
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

  const features = [
    {
      title: "Genuine OEM Products",
      description: "Sourcing genuine industrial machinery and spare parts from established manufacturers based on your requirements.",
      icon: <Award className="h-6 w-6" />,
    },
    {
      title: "Nationwide Delivery",
      description: "Coordinated logistics support for engineering sites and operations across India.",
      icon: <Truck className="h-6 w-6" />,
    },
    {
      title: "Trusted Vendor Network",
      description: "Access to qualified suppliers for industrial components based on product and application requirements.",
      icon: <Handshake className="h-6 w-6" />,
    },
    {
      title: "Technical Sourcing Experts",
      description: "Experienced engineers help review schematics and verify technical product specifications.",
      icon: <UserCheck className="h-6 w-6" />,
    },
    {
      title: "Fast RFQ Response",
      description: "Structured inquiry handling to provide commercial pricing quotes based on your requirement.",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: "Long-Term Customer Support",
      description: "Dedicated account managers provide after-sales assistance and procurement support.",
      icon: <Headphones className="h-6 w-6" />,
    },
  ];

  return (
    <section className="w-full bg-white py-24 border-t border-slate-100 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        
        {/* Section Heading Block */}
        <div className="text-center mb-16">
          <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-4">
            Why Choose Mahi Controls
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#0F172A] leading-tight tracking-tight mb-4">
            Engineering Procurement Built Around Reliability
          </h2>
          <p className="text-[#334155] text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Every procurement decision impacts project timelines and operational efficiency. 
            Mahi Controls combines technical expertise, supplier coordination
            and responsive customer support to deliver dependable sourcing solutions.
          </p>
        </div>

        {/* Features 3-Column Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              className="relative group bg-[#F8FAFC]/50 hover:bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl p-8 flex gap-5 shadow-md hover:shadow-xl hover:shadow-slate-100/50 hover:-translate-y-1 transition-all duration-300 select-none"
            >
              {/* Left Accent Orange Line */}
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-transparent group-hover:bg-[#F97316] transition-all duration-300 rounded-l-2xl" />

              {/* Icon Container */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white group-hover:scale-105 transition-all duration-300">
                {item.icon}
              </div>

              {/* Text Block */}
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] tracking-tight mb-2 group-hover:text-[#F97316] transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-[#334155] text-sm leading-relaxed min-h-[40px]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default WhyChooseUsSection;
