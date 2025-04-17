
import { Leaf, Recycle, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SustainabilitySection = () => {
  const stats = [
    {
      icon: <Leaf className="h-8 w-8 mb-4 text-sage-600" />,
      value: "92%",
      label: "Reduction in carbon footprint compared to buying new garments in India",
    },
    {
      icon: <Recycle className="h-8 w-8 mb-4 text-sage-600" />,
      value: "7.4",
      label: "Tons of textile waste diverted from Indian landfills through our platform",
    },
    {
      icon: <ThumbsUp className="h-8 w-8 mb-4 text-sage-600" />,
      value: "16,800+",
      label: "Successful garment transformations across Delhi, Mumbai, Bangalore & more",
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-sage-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-forest-800 mb-4">
                Making Fashion <span className="text-terracotta-600">Sustainable</span> in India
              </h2>
              <p className="text-forest-600 mb-6">
                India generates over 1 million tonnes of textile waste annually, with much of it ending up in landfills across major cities like Delhi, Mumbai, and Kolkata. By upcycling just one garment, you can help reduce waste and your carbon footprint.
              </p>
              <p className="text-forest-600 mb-8">
                Our platform tracks your sustainability impact, showing you exactly how your upcycling projects are making a difference. With India being the world's second-largest textile producer, your small actions create significant positive change for our environment and communities.
              </p>
              <Button asChild className="bg-sage-600 hover:bg-sage-700 text-white">
                <Link to="/upload">Start Your Sustainability Journey</Link>
              </Button>
            </div>
            
            <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 text-center shadow-sm border border-sage-100 animate-fade-in-up"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="flex justify-center">
                    {stat.icon}
                  </div>
                  <p className="text-3xl font-display font-bold text-forest-800 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-forest-600">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
