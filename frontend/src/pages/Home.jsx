import MainLayout from "../components/layout/MainLayout";
import HeroSection from "../components/home/HeroSection";
import TrustedBrands from "../components/home/TrustedBrands";
import AboutSection from "../components/home/AboutSection";
import ExpertiseSection from "../components/home/ExpertiseSection";
import IndustriesSection from "../components/home/IndustriesSection";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection";
import FeaturedProductsSection from "../components/home/FeaturedProductsSection";
import FeaturedProjectsSection from "../components/home/FeaturedProjectsSection";
import CallToActionSection from "../components/home/CallToActionSection";

function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <TrustedBrands />
      <AboutSection />
      <ExpertiseSection />
      <IndustriesSection />
      <WhyChooseUsSection />
      <FeaturedProductsSection />
      <FeaturedProjectsSection />
      <CallToActionSection />
    </MainLayout>
  );
}

export default Home;