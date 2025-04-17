
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ProcessSection from "@/components/home/ProcessSection";
import SustainabilitySection from "@/components/home/SustainabilitySection";
import GalleryPreviewSection from "@/components/home/GalleryPreviewSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <ProcessSection />
        <SustainabilitySection />
        <GalleryPreviewSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
