// More specific and prioritized garment keywords for improved detection
const garmentKeywords = {
  tshirt: ["t-shirt", "tshirt", "t shirt", "tee", "jersey", "polo", "casual top", "knit top"],
  shirt: ["shirt", "button", "dress shirt", "formal", "collared", "blouse", "oxford"],
  denim: ["jeans", "denim", "blue jeans", "pants", "trousers", "denim jacket"],
  dress: ["dress", "gown", "frock", "apparel", "outfit", "sundress"],
  saree: ["saree", "sari", "indian", "drape", "traditional indian"],
  kurta: ["kurta", "kurti", "tunic", "ethnic", "indian tunic"],
  lehenga: ["lehenga", "skirt", "ghagra", "choli", "indian skirt"],
  salwar: ["salwar", "kameez", "punjabi suit", "churidar", "indian pants"],
  jacket: ["jacket", "blazer", "coat", "outerwear", "winter"]
};

// Function to detect garment type using Gemini API
export const detectGarmentType = async (imageDataUrl: string): Promise<string> => {
  console.log("Starting garment detection...");

  try {
    // Call Gemini API for image classification
    const response = await fetch("https://api.gemini.com/v1/image-classification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer YOUR_GEMINI_API_KEY`
      },
      body: JSON.stringify({ image: imageDataUrl })
    });

    if (!response.ok) {
      console.warn("Request failed, using fallback detection");
      return await fallbackDetection(imageDataUrl);
    }

    const result = await response.json();
    console.log("Classification result:", result);

    if (!result || result.length === 0) {
      console.log("No classification results, using fallback");
      return await fallbackDetection(imageDataUrl);
    }

    // Enhanced detection logic with weight system for better accuracy
    let bestMatch = "";
    let highestScore = 0;

    // First pass: look for direct garment keywords with high confidence
    for (const [garmentType, keywords] of Object.entries(garmentKeywords)) {
      for (const item of result) {
        const loweredLabel = item.label.toLowerCase();

        for (const keyword of keywords) {
          if (loweredLabel.includes(keyword)) {
            // Higher priority keywords at the beginning of the array
            const keywordIndex = keywords.indexOf(keyword);
            const keywordPriority = 1 - (keywordIndex / keywords.length) * 0.3;
            const adjustedScore = item.score * keywordPriority;

            console.log(`Found keyword match: ${keyword} for ${garmentType} with score ${adjustedScore}`);

            if (adjustedScore > highestScore) {
              highestScore = adjustedScore;
              bestMatch = garmentType;
            }
          }
        }
      }
    }

    // If we found a match with good confidence
    if (bestMatch && highestScore > 0.1) {
      console.log(`Detected garment type: ${bestMatch} with confidence: ${highestScore}`);
      return bestMatch;
    }

    // Second pass: analyze general categories from classification results
    for (const item of result) {
      const loweredLabel = item.label.toLowerCase();

      // Look for general clothing categories
      if (
        loweredLabel.includes("apparel") ||
        loweredLabel.includes("clothing") ||
        loweredLabel.includes("garment") ||
        loweredLabel.includes("attire") ||
        loweredLabel.includes("wear") ||
        loweredLabel.includes("cloth")
      ) {
        console.log("Found clothing category in:", loweredLabel);
        // Use color analysis as additional signal
        return await fallbackDetection(imageDataUrl, result);
      }
    }

    // If still no match, use color and texture analysis
    return await fallbackDetection(imageDataUrl, result);

  } catch (error) {
    console.error("Error in garment detection:", error);
    return await fallbackDetection(imageDataUrl);
  }
};

// Enhanced fallback detection using image analysis
const fallbackDetection = async (imageDataUrl: string, classifierResults?: any[]): Promise<string> => {
  // (Keep the existing fallbackDetection implementation here)
};

// Function to analyze the condition of the garment using basic image analysis
export const analyzeGarmentCondition = async (garmentType: string, imageDataUrl: string): Promise<string> => {
  // (Keep the existing analyzeGarmentCondition implementation here)
};
