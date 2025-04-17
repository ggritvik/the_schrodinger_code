import axios from 'axios';

const GEMINI_API_BASE_URL = process.env.GEMINI_API_BASE_URL || ''; // Load from environment variable
const API_KEY = process.env.GEMINI_API_KEY || ''; // Load API key from environment variable

if (!GEMINI_API_BASE_URL) {
  throw new Error('GEMINI_API_BASE_URL is not defined in environment variables');
}

if (!API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

// Function to fetch sustainability data from Gemini API
export const fetchSustainabilityData = async (garmentType: string): Promise<{ water: number; co2: number; waste: number }> => {
  try {
    const response = await axios.get(`${GEMINI_API_BASE_URL}/sustainability-data`, {
      params: { garmentType },
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sustainability data:', error);
    throw new Error('Failed to fetch sustainability data');
  }
};

// Function to fetch material composition from Gemini API
export const fetchMaterialComposition = async (garmentType: string): Promise<{ type: string; percentage: number }[]> => {
  try {
    const response = await axios.get(`${GEMINI_API_BASE_URL}/material-composition`, {
      params: { garmentType },
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching material composition:', error);
    throw new Error('Failed to fetch material composition');
  }
};
