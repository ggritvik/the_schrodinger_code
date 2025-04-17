
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative pt-16 md:pt-24 lg:pt-32 pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-sage-200 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-earth-200 rounded-full opacity-50 blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-forest-800 mb-6">
            Transform Your Old Clothes With <span className="text-terracotta-600">AI-Powered</span> Fashion Upcycling
          </h1>
          
          <p className="text-lg md:text-xl text-forest-600 mb-8 max-w-3xl mx-auto">
            Breathe new life into your wardrobe while reducing textile waste. Our AI suggests creative upcycling ideas and connects you with local tailors to make it happen.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              asChild
              className="text-lg py-6 bg-terracotta-600 hover:bg-terracotta-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              size="lg"
            >
              <Link to="/upload">
                Start Upcycling
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="text-lg py-6 bg-transparent text-forest-700 hover:text-terracotta-700 border-forest-600 hover:border-terracotta-600 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all"
            >
              <Link to="/gallery">
                View Gallery
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex -space-x-4">
              {/* This would be actual user avatars in a real app */}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-sage-300 flex items-center justify-center">
                <span className="text-xs text-forest-800 font-medium">JD</span>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-earth-300 flex items-center justify-center">
                <span className="text-xs text-forest-800 font-medium">SK</span>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-terracotta-300 flex items-center justify-center">
                <span className="text-xs text-forest-800 font-medium">AR</span>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-sage-200 flex items-center justify-center">
                <span className="text-xs text-forest-800 font-medium">+42</span>
              </div>
            </div>
            <p className="text-sm text-forest-600">
              Joined by <span className="font-semibold">3,500+</span> sustainable fashion enthusiasts
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-sm">
              <p className="text-3xl md:text-4xl font-display font-bold text-forest-800">12.4K</p>
              <p className="text-sm text-forest-600">Garments Upcycled</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-sm">
              <p className="text-3xl md:text-4xl font-display font-bold text-forest-800">240+</p>
              <p className="text-sm text-forest-600">Local Tailors</p>
            </div>
            <div className="hidden md:block bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-sm">
              <p className="text-3xl md:text-4xl font-display font-bold text-forest-800">5.8 tons</p>
              <p className="text-sm text-forest-600">Textile Waste Saved</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
