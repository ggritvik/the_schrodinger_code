import { UpcyclingIdea } from './types';
import axios from 'axios';

// Function to fetch ideas from Gemini API
export const fetchIdeasFromGemini = async (garmentType: string): Promise<UpcyclingIdea[]> => {
  try {
    const response = await axios.get(`https://api.gemini.com/upcycling-ideas`, {
      params: { garmentType },
    });
    return response.data.ideas as UpcyclingIdea[];
  } catch (error) {
    console.error('Error fetching ideas:', error);
    return [];
  }
};

// Example usage
export const getIdeasForGarment = async (garmentType: string): Promise<UpcyclingIdea[]> => {
  const ideas = await fetchIdeasFromGemini(garmentType);
  return ideas.length > 0 ? ideas : [];
};
