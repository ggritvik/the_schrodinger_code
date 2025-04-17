
import { ArrowRight } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "Upload Your Garment",
      description: "Take a clear photo of the garment you'd like to upcycle and upload it to our platform."
    },
    {
      number: "02",
      title: "Receive AI Suggestions",
      description: "Our AI analyzes your garment and generates creative upcycling ideas with visual mockups."
    },
    {
      number: "03", 
      title: "Choose Your Favorite Design",
      description: "Browse through the suggestions and select the one that appeals to you the most."
    },
    {
      number: "04",
      title: "Connect with a Tailor",
      description: "Find a skilled local tailor who can bring your upcycling vision to life."
    },
    {
      number: "05",
      title: "Share Your Transformation",
      description: "Show off your upcycled creation in our community gallery to inspire others."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-forest-800 mb-4">
            The Upcycling Journey
          </h2>
          <p className="text-lg text-forest-600">
            From your closet to a renewed fashion statement in five simple steps
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center mb-12 last:mb-0 animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
                <div className="rounded-full bg-sage-100 w-24 h-24 flex items-center justify-center border-4 border-sage-200">
                  <span className="font-display text-3xl font-bold text-forest-700">{step.number}</span>
                </div>
              </div>
              
              <div className={`w-full md:w-2/3 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                <h3 className="text-2xl font-display font-semibold text-forest-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-forest-600">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                  {/* <ArrowRight className={`text-terracotta-500 rotate-90 ${
                    index % 2 === 0 ? 'ml-0' : 'ml-0'
                  }`} /> */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
