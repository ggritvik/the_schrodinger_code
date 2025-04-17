// Types for our analysis results
export interface GarmentAnalysis {
  garmentType: string;
  condition: string;
  materialComposition: {
    type: string;
    percentage: number;
  }[];
  sustainabilityImpact: {
    waterSaved: number; // liters
    co2Reduced: number; // kg
    wasteDiverted: number; // kg
  };
}

export interface UpcyclingIdea {
  id: number;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeNeeded: string;
  materials: string[];
  beforeImage: string;
  afterImage: string;
}

// Map garment types to sustainability impact data
const sustainabilityData: Record<string, { water: number; co2: number; waste: number }> = {
  "denim": { water: 7000, co2: 33, waste: 0.8 },
  "tshirt": { water: 2700, co2: 7, waste: 0.3 },
  "dress": { water: 4800, co2: 15, waste: 0.5 },
  "jacket": { water: 5200, co2: 20, waste: 0.7 },
  "shirt": { water: 3000, co2: 9, waste: 0.35 },
  "pants": { water: 4000, co2: 12, waste: 0.45 },
  "saree": { water: 6500, co2: 25, waste: 0.9 },
  "kurta": { water: 3200, co2: 10, waste: 0.4 },
  "salwar": { water: 3800, co2: 11, waste: 0.42 },
  "lehenga": { water: 5500, co2: 22, waste: 0.85 },
  "default": { water: 3500, co2: 10, waste: 0.4 }
};

// Mock ideas matched to garment types
const garmentToIdeas: Record<string, UpcyclingIdea[]> = {
  // Same as before
};

// Function to get material composition based on garment type
const getMockMaterialComposition = (garmentType: string): { type: string; percentage: number }[] => {
  // Same as before
};

// Function to analyze garment from image using Gemini API
export const analyzeGarment = async (imageDataUrl: string): Promise<GarmentAnalysis> => {
  try {
    // Call Gemini API for garment analysis
    const response = await fetch("https://api.gemini.com/analyze-garment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageDataUrl }),
    });

    if (!response.ok) {
      throw new Error("Failed to analyze garment using Gemini API");
    }

    const result = await response.json();

    // Extract garment type and condition from Gemini API response
    const garmentType = result.garmentType || "Unknown";
    const condition = result.condition || "Unable to assess condition";

    // Get material composition based on garment type
    const materials = getMockMaterialComposition(garmentType);

    // Generate sustainability impact data
    const impactData = sustainabilityData[garmentType.toLowerCase()] || sustainabilityData.default;

    return {
      garmentType: garmentType.charAt(0).toUpperCase() + garmentType.slice(1),
      condition,
      materialComposition: materials,
      sustainabilityImpact: {
        waterSaved: impactData.water,
        co2Reduced: impactData.co2,
        wasteDiverted: impactData.waste,
      },
    };
  } catch (error) {
    console.error("Error in garment analysis:", error);

    // Return fallback data
    return {
      garmentType: "Unknown",
      condition: "Unable to assess condition",
      materialComposition: [{ type: "Unknown", percentage: 100 }],
      sustainabilityImpact: {
        waterSaved: sustainabilityData.default.water,
        co2Reduced: sustainabilityData.default.co2,
        wasteDiverted: sustainabilityData.default.waste,
      },
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

  // Return default ideas if no specific match
  return garmentToIdeas.default;
};
