
// Define types for our AI analysis results
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
