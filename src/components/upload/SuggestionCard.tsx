
import { motion } from "framer-motion";
import { Scissors, Pencil, Download, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type SuggestionType = {
  id: number;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeNeeded: string;
  materials: string[];
};

interface SuggestionCardProps {
  suggestion: SuggestionType;
  isVisible: boolean;
}

const SuggestionCard = ({ suggestion, isVisible }: SuggestionCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-md border border-sage-100"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Before-After Comparison */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative h-64 md:h-full">
            <img 
              src={suggestion.beforeImage} 
              alt="Before" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-forest-800/50 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="bg-forest-900/70 text-white text-xs px-2 py-1 rounded">Before</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 bottom-0 w-1/2 overflow-hidden">
            <div className="h-full w-full relative">
              <img 
                src={suggestion.afterImage} 
                alt="After" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4">
                <span className="bg-terracotta-600/90 text-white text-xs px-2 py-1 rounded">After</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="w-full md:w-1/2 p-6">
          <h3 className="font-display text-xl font-semibold text-forest-800 mb-2">
            {suggestion.title}
          </h3>
          
          <p className="text-forest-600 text-sm mb-4">
            {suggestion.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(suggestion.difficulty)}`}>
              {suggestion.difficulty} Difficulty
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-sage-100 text-forest-700">
              {suggestion.timeNeeded}
            </span>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-forest-700 mb-1">Materials Needed:</h4>
            <ul className="text-sm text-forest-600 space-y-1">
              {suggestion.materials.map((material, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1 h-1 bg-terracotta-500 rounded-full mr-2"></span>
                  {material}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button variant="outline" className="flex items-center justify-center gap-2 text-forest-700 border-forest-200">
              <Scissors className="h-4 w-4" />
              <span>DIY Guide</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2 text-forest-700 border-forest-200">
              <Pencil className="h-4 w-4" />
              <span>Find Tailor</span>
            </Button>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button className="text-forest-600 hover:text-terracotta-600 transition-colors">
                <ThumbsUp className="h-5 w-5" />
              </button>
              <button className="text-forest-600 hover:text-terracotta-600 transition-colors">
                <ThumbsDown className="h-5 w-5" />
              </button>
            </div>
            <Button variant="ghost" size="sm" className="text-forest-700">
              <Download className="h-4 w-4 mr-1" />
              Save Idea
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SuggestionCard;
