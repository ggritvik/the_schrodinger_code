
import { 
  Camera, 
  Sparkles, 
  Scissors, 
  Map, 
  BarChart, 
  Users 
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Camera className="h-10 w-10 text-terracotta-600" />,
      title: "Garment Upload",
      description: "Simply take a photo of your old clothes and upload them to our platform for analysis."
    },
    {
      icon: <Sparkles className="h-10 w-10 text-terracotta-600" />,
      title: "AI Upcycling Ideas",
      description: "Our AI analyzes your garments and generates creative upcycling suggestions with visual mockups."
    },
    {
      icon: <Scissors className="h-10 w-10 text-terracotta-600" />,
      title: "Transformation Instructions",
      description: "Get detailed step-by-step instructions for DIY projects or to share with tailors."
    },
    {
      icon: <Map className="h-10 w-10 text-terracotta-600" />,
      title: "Local Tailor Matching",
      description: "Connect with skilled local tailors who can help bring your upcycling vision to life."
    },
    {
      icon: <BarChart className="h-10 w-10 text-terracotta-600" />,
      title: "Sustainability Tracker",
      description: "Measure your environmental impact by tracking how much textile waste you're diverting from landfills."
    },
    {
      icon: <Users className="h-10 w-10 text-terracotta-600" />,
      title: "Community Gallery",
      description: "Share your success stories and browse before-and-after transformations from other users."
    }
  ];

  return (
    <section className="py-16 bg-sage-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-forest-800 mb-4">
            How Stitch It Forward Works
          </h2>
          <p className="text-lg text-forest-600 max-w-3xl mx-auto">
            Our platform combines AI technology with sustainable fashion practices to give your old clothes a new purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-sage-100 transform hover:-translate-y-1 transition-transform duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-sage-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-semibold text-forest-800 mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-forest-600 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
