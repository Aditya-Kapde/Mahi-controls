import graderSunset from "../../assets/grader_sunset.png";
import HeroContent from "./HeroContent";

function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden bg-[#0F172A] z-0">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 scale-105"
        style={{ backgroundImage: `url(${graderSunset})` }}
      />
      
      {/* Dark Overlay Tint for contrast */}
      <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-[#0F172A]/80 via-black/45 to-black/85 z-0" />

      {/* Hero Content Section */}
      <HeroContent />
    </section>
  );
}

export default HeroSection;
