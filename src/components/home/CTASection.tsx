
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 bg-terracotta-50">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-terracotta-600 to-terracotta-700 rounded-2xl p-8 md:p-16 text-center relative overflow-hidden shadow-xl">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 right-0 bg-terracotta-400 opacity-20 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 bg-terracotta-400 opacity-20 w-64 h-64 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto">
            <Sparkles className="h-16 w-16 text-white/90 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Ready to Give Your Old Clothes a New Purpose?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of fashion enthusiasts who are making a positive impact on the environment through creative upcycling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg" 
                className="bg-white text-terracotta-600 hover:bg-terracotta-50 text-lg"
              >
                <Link to="/upload">Upload Your First Garment</Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-terracotta-500 hover:text-white text-lg"
              >
                <Link to="/tailors">Find Local Tailors</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
