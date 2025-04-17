import axios from "axios";
import { GarmentAnalysis, UpcyclingIdea } from "./types";

// geminiService.ts

const GEMINI_API_URL = "https://api.gemini.example.com"; // Replace with the actual Gemini API URL
const API_KEY = "your-api-key-here"; // Replace with your API key

export async function fetchGarmentAnalysis(garmentId: string): Promise<GarmentAnalysis> {
  try {
    const response = await axios.get(`${GEMINI_API_URL}/garments/${garmentId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const data = response.data;

    // Map Gemini API response to GarmentAnalysis type
    const analysis: GarmentAnalysis = {
      garmentType: data.type,
      condition: data.condition,
      materialComposition: data.materials.map((material: any) => ({
        type: material.name,
        percentage: material.percentage,
      })),
      sustainabilityImpact: {
        waterSaved: data.sustainability.waterSaved,
        co2Reduced: data.sustainability.co2Reduced,
        wasteDiverted: data.sustainability.wasteDiverted,
      },
    };

    return analysis;
  } catch (error) {
    console.error("Error fetching garment analysis:", error);
    throw error;
  }
}

export async function fetchUpcyclingIdeas(): Promise<UpcyclingIdea[]> {
  try {
    const response = await axios.get(`${GEMINI_API_URL}/upcycling-ideas`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const data = response.data;

    // Map Gemini API response to UpcyclingIdea type
    const ideas: UpcyclingIdea[] = data.ideas.map((idea: any) => ({
      id: idea.id,
      title: idea.title,
      description: idea.description,
      difficulty: idea.difficulty,
      timeNeeded: idea.timeNeeded,
      materials: idea.materials,
      beforeImage: idea.beforeImage,
      afterImage: idea.afterImage,
    }));

    return ideas;
  } catch (error) {
    console.error("Error fetching upcycling ideas:", error);
    throw error;
  }
}
