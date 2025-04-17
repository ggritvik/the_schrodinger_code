import { GarmentAnalysis, UpcyclingIdea } from './types';
import { sustainabilityData, getMaterialComposition } from './sustainabilityData';
import { garmentToIdeas } from './mockIdeas';
import { detectGarmentTypeWithGemini, analyzeGarmentConditionWithGemini } from './geminiApi'; // Import Gemini API functions

// Main function to analyze garment from image
export const analyzeGarment = async (
  imageDataUrl: string, 
  userSelectedType?: string
): Promise<GarmentAnalysis> => {
  try {
    console.log("Starting garment analysis...");
    
    // Always prioritize user selection if available
    if (userSelectedType) {
      console.log(`Using user-selected garment type: ${userSelectedType}`);
      
      // Get material composition based on garment type
      const materials = getMaterialComposition(userSelectedType);
      
      // Generate sustainability impact data
      const impactData = sustainabilityData[userSelectedType] || sustainabilityData.default;
      
      // Use simplified condition assessment for user-selected types
      return {
        garmentType: userSelectedType.charAt(0).toUpperCase() + userSelectedType.slice(1),
        condition: "Good condition with minor wear. The material is suitable for upcycling projects.",
        materialComposition: materials,
        sustainabilityImpact: {
          waterSaved: impactData.water,
          co2Reduced: impactData.co2,
          wasteDiverted: impactData.waste
        }
      };
    }
    
    // If no user selection, use Gemini API detection with improved logging
    console.log("No user selection, attempting Gemini API detection");
    console.time('garmentDetection');
    const garmentType = await detectGarmentTypeWithGemini(imageDataUrl); // Use Gemini API for garment type detection
    console.timeEnd('garmentDetection');
    console.log(`Gemini-detected garment type: ${garmentType}`);
    
    // Get material composition based on garment type
    const materials = getMaterialComposition(garmentType);
    
    // Generate sustainability impact data
    const impactData = sustainabilityData[garmentType] || sustainabilityData.default;
    
    // Assess condition using Gemini API
    const condition = await analyzeGarmentConditionWithGemini(garmentType, imageDataUrl); // Use Gemini API for condition analysis
    
    return {
      garmentType: garmentType.charAt(0).toUpperCase() + garmentType.slice(1),
      condition,
      materialComposition: materials,
      sustainabilityImpact: {
        waterSaved: impactData.water,
        co2Reduced: impactData.co2,
        wasteDiverted: impactData.waste
      }
    };
  } catch (error) {
    console.error("Error in garment analysis:", error);
    
    // If there's an error but user selected a type, use that instead of falling back
    if (userSelectedType) {
      const materials = getMaterialComposition(userSelectedType);
      const impactData = sustainabilityData[userSelectedType] || sustainabilityData.default;
      
      return {
        garmentType: userSelectedType.charAt(0).toUpperCase() + userSelectedType.slice(1),
        condition: "Good condition with minor wear. The material is suitable for upcycling projects.",
        materialComposition: materials,
        sustainabilityImpact: {
          waterSaved: impactData.water,
          co2Reduced: impactData.co2,
          wasteDiverted: impactData.waste
        }
      };
    }
    
    // Ultimate fallback to denim which has more interesting upcycling ideas
    return {
      garmentType: "Denim",
      condition: "Unable to fully assess condition, but suitable for most upcycling projects.",
      materialComposition: [{ type: "Cotton", percentage: 85 }, { type: "Polyester", percentage: 13 }, { type: "Elastane", percentage: 2 }],
      sustainabilityImpact: {
        waterSaved: sustainabilityData.denim.water,
        co2Reduced: sustainabilityData.denim.co2,
        wasteDiverted: sustainabilityData.denim.waste
      }
    };
  }
};

// Function to get upcycling ideas based on garment type
export const getUpcyclingIdeas = (garmentType: string): UpcyclingIdea[] => {
  const normalizedType = garmentType.toLowerCase();
  
  // Check if we have specific ideas for this garment type
  for (const [type, ideas] of Object.entries(garmentToIdeas)) {
    if (normalizedType.includes(type)) {
      return ideas;
    }
  }
  
  // Return denim ideas as default (instead of t-shirt default)
  if (garmentToIdeas.denim && garmentToIdeas.denim.length > 0) {
    return garmentToIdeas.denim;
  }
  
  // Fallback to default ideas if denim ideas aren't available
  return garmentToIdeas.default;
};

// Export all types from the module
export * from './types';
