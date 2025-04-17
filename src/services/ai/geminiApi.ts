// Mock implementation of Gemini API functions
export const detectGarmentTypeWithGemini = async (imageDataUrl: string): Promise<string> => {
    console.log("Mock: Detecting garment type...");
    return "t-shirt"; // Example garment type
  };
  
  export const analyzeGarmentConditionWithGemini = async (garmentType: string, imageDataUrl: string): Promise<string> => {
    console.log("Mock: Analyzing garment condition...");
    return "Good condition with minor wear."; // Example condition
  };
