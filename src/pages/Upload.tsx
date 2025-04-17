
import { useState } from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import UploadForm from "@/components/upload/UploadForm";
import SuggestionCard, { SuggestionType } from "@/components/upload/SuggestionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { analyzeGarment, getUpcyclingIdeas, GarmentAnalysis } from "@/services/ai";
import { useToast } from "@/components/ui/use-toast";

const Upload = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [garmentAnalysis, setGarmentAnalysis] = useState<GarmentAnalysis | null>(null);
  const [upcyclingSuggestions, setUpcyclingSuggestions] = useState<SuggestionType[]>([]);
  const [activeTabId, setActiveTabId] = useState("ideas");
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const { toast } = useToast();

  const handleUploadComplete = async (imageUrl: string, selectedGarmentType?: string) => {
    setUploadedImage(imageUrl);
    setIsAnalyzing(true);
    
    try {
      // Run AI analysis on the image, passing the manually selected garment type if available
      const analysis = await analyzeGarment(imageUrl, selectedGarmentType);
      setGarmentAnalysis(analysis);
      
      // Get upcycling ideas based on the garment type
      const ideas = getUpcyclingIdeas(analysis.garmentType);
      setUpcyclingSuggestions(ideas);
      
      setAnalysisComplete(true);
      
      // Show success toast with detected garment type
      toast({
        title: "Analysis Complete",
        description: `We've identified your garment as a ${analysis.garmentType} and found ${ideas.length} upcycling ideas!`,
        variant: "default"
      });
    } catch (error) {
      console.error("Error during analysis:", error);
      toast({
        title: "Analysis Failed",
        description: "We couldn't analyze your garment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNextSuggestion = () => {
    setCurrentSuggestion((prev) => (prev + 1) % upcyclingSuggestions.length);
  };

  const handlePrevSuggestion = () => {
    setCurrentSuggestion((prev) => (prev - 1 + upcyclingSuggestions.length) % upcyclingSuggestions.length);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">
        <section className="py-12 md:py-16 bg-sage-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-forest-800 mb-4">
                Upload Your Garment
              </h1>
              <p className="text-lg text-forest-600 max-w-2xl mx-auto">
                Our AI will analyze your garment and suggest creative upcycling ideas with an Indian touch
              </p>
            </div>
            
            {!analysisComplete && (
              <UploadForm onUploadComplete={handleUploadComplete} />
            )}
            
            {isAnalyzing && (
              <div className="flex flex-col items-center justify-center py-10">
                <Loader2 className="h-12 w-12 text-terracotta-500 animate-spin mb-4" />
                <h2 className="text-xl font-display font-semibold text-forest-800">
                  Analyzing Your Garment...
                </h2>
                <p className="text-forest-600 mt-2">
                  Our AI is examining your garment for upcycling opportunities
                </p>
              </div>
            )}
            
            {analysisComplete && garmentAnalysis && (
              <div className="max-w-5xl mx-auto">
                <Tabs value={activeTabId} onValueChange={setActiveTabId}>
                  <div className="flex justify-center mb-6">
                    <TabsList className="bg-sage-100">
                      <TabsTrigger value="ideas" className="data-[state=active]:bg-white">
                        Upcycling Ideas
                      </TabsTrigger>
                      <TabsTrigger value="details" className="data-[state=active]:bg-white">
                        Garment Analysis
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="ideas" className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-display font-semibold text-forest-800 flex items-center">
                        <Sparkles className="mr-2 h-5 w-5 text-terracotta-500" />
                        AI-Generated Upcycling Ideas
                      </h2>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="rounded-full"
                          onClick={handlePrevSuggestion}
                          disabled={upcyclingSuggestions.length <= 1}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <span className="text-sm text-forest-600">
                          {currentSuggestion + 1} of {upcyclingSuggestions.length}
                        </span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="rounded-full"
                          onClick={handleNextSuggestion}
                          disabled={upcyclingSuggestions.length <= 1}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    
                    {upcyclingSuggestions.map((suggestion, index) => (
                      <SuggestionCard 
                        key={suggestion.id}
                        suggestion={suggestion}
                        isVisible={index === currentSuggestion}
                      />
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="details" className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-2xl font-display font-semibold text-forest-800 mb-4">
                      AI Garment Analysis
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <img 
                          src={uploadedImage || ""} 
                          alt="Uploaded garment" 
                          className="w-full h-auto max-h-80 object-contain rounded-lg border border-sage-100"
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium text-forest-700">Identified Garment</h3>
                          <p className="text-forest-600">{garmentAnalysis.garmentType}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-forest-700">Material Composition</h3>
                          {garmentAnalysis.materialComposition.map((material, idx) => (
                            <div key={idx} className="flex gap-2 mt-1">
                              <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                                <div 
                                  className={`${
                                    idx === 0 ? "bg-blue-500" : 
                                    idx === 1 ? "bg-blue-300" : "bg-blue-200"
                                  } h-full`} 
                                  style={{ width: `${material.percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-forest-600">{material.percentage}% {material.type}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-forest-700">Condition Assessment</h3>
                          <p className="text-forest-600">{garmentAnalysis.condition}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-forest-700">Environmental Impact</h3>
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center justify-between border-b border-sage-100 pb-1">
                              <span className="text-forest-600">Water Saved:</span>
                              <span className="font-medium text-forest-700">{garmentAnalysis.sustainabilityImpact.waterSaved.toLocaleString()} liters</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-sage-100 pb-1">
                              <span className="text-forest-600">CO₂ Emissions Reduced:</span>
                              <span className="font-medium text-forest-700">{garmentAnalysis.sustainabilityImpact.co2Reduced.toLocaleString()} kg</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-forest-600">Textile Waste Diverted:</span>
                              <span className="font-medium text-forest-700">{garmentAnalysis.sustainabilityImpact.wasteDiverted.toLocaleString()} kg</span>
                            </div>
                            <div className="mt-3 bg-sage-50 p-3 rounded-lg text-sm text-forest-600">
                              <p>That's equivalent to saving water for{' '}
                                <span className="font-medium text-forest-700">
                                  {Math.round(garmentAnalysis.sustainabilityImpact.waterSaved / 150)} days
                                </span>{' '}
                                of average household usage in India!
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-8 text-center">
                  <Button 
                    onClick={() => {
                      setUploadedImage(null);
                      setAnalysisComplete(false);
                      setGarmentAnalysis(null);
                      setUpcyclingSuggestions([]);
                    }}
                    variant="ghost"
                    className="text-forest-600 hover:text-forest-800"
                  >
                    Upload a Different Garment
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Upload;
