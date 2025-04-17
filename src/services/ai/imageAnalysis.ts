
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

// Initialize models lazily
let classificationModel: any = null;

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

// Function to initialize image classification model with multiple fallbacks
const initModel = async (): Promise<boolean> => {
  try {
    if (!classificationModel) {
      console.log("Initializing image classification model...");
      
      // Try three different models in sequence for maximum compatibility
      const modelOptions = [
        { name: "Xenova/mobilevit-small", device: 'cpu' },
        { name: "Xenova/vit-base-patch16-224", device: 'cpu' },
        { name: "microsoft/resnet-50", device: 'cpu' }
      ];
      
      for (const modelOption of modelOptions) {
        try {
          console.log(`Attempting to load model: ${modelOption.name}`);
          classificationModel = await pipeline(
            "image-classification", 
            modelOption.name,
            { device: modelOption.device }
          );
          console.log(`Successfully loaded model: ${modelOption.name}`);
          break; // Exit the loop if a model loads successfully
        } catch (error) {
          console.log(`Failed to load model ${modelOption.name}:`, error);
          // Continue to the next model option
        }
      }
    }
    
    return classificationModel !== null;
  } catch (error) {
    console.error("Error initializing models:", error);
    return false;
  }
};

// Function to detect garment type from image with improved accuracy
export const detectGarmentType = async (imageDataUrl: string): Promise<string> => {
  console.log("Starting garment detection...");
  
  try {
    // Initialize model if not already done
    const modelInitialized = await initModel();
    
    if (!modelInitialized || !classificationModel) {
      console.warn("Model initialization failed, using fallback detection");
      return await fallbackDetection(imageDataUrl);
    }
    
    // Run image classification
    console.log("Running classification model");
    const result = await classificationModel(imageDataUrl, {
      topk: 20 // Get more classification results for better matching
    });
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
  try {
    console.log("Using fallback garment detection...");
    
    // Create a temporary canvas to analyze the image colors and patterns
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    // Create a promise to handle the async image load
    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        resolve();
      };
      img.src = imageDataUrl;
      img.onerror = (err) => reject(err);
    });
    
    // Get color data for enhanced analysis
    const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData?.data;
    
    if (!data) {
      console.log("No image data available for analysis");
      return "tshirt";
    }
    
    // Enhanced color-based heuristics for better garment detection
    let whiteCount = 0;
    let blueCount = 0;
    let redCount = 0;
    let greenCount = 0;
    let brightColorCount = 0;
    let darkCount = 0;
    let patternVariance = 0;
    let prevPixel = [0, 0, 0, 0];
    let totalPixels = canvas.width * canvas.height;
    
    // Sample every 4th pixel to improve performance
    for (let i = 0; i < data.length; i += 16) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Detect whites and light colors (common in t-shirts)
      if (r > 200 && g > 200 && b > 200) {
        whiteCount++;
      }
      
      // Detect blues (common in denim)
      if (b > r + 50 && b > g + 50) {
        blueCount++;
      }
      
      // Detect reds (common in many Indian garments)
      if (r > b + 50 && r > g + 50) {
        redCount++;
      }
      
      // Detect greens
      if (g > r + 50 && g > b + 50) {
        greenCount++;
      }
      
      // Detect bright colors (common in t-shirts and casual wear)
      const brightness = (r + g + b) / 3;
      if (brightness > 150) {
        brightColorCount++;
      }
      
      // Detect dark colors (formal wear, denim)
      if (brightness < 80) {
        darkCount++;
      }
      
      // Calculate pattern variance (higher in patterned garments like traditional wear)
      if (i > 0) {
        patternVariance += Math.abs(r - prevPixel[0]) + Math.abs(g - prevPixel[1]) + Math.abs(b - prevPixel[2]);
      }
      
      prevPixel = [r, g, b, data[i+3]];
    }
    
    // Calculate percentages and normalize pattern variance
    const whitePercent = whiteCount / (totalPixels / 4); // Adjusting for sampling rate
    const bluePercent = blueCount / (totalPixels / 4);
    const redPercent = redCount / (totalPixels / 4);
    const brightPercent = brightColorCount / (totalPixels / 4);
    const darkPercent = darkCount / (totalPixels / 4);
    const normalizedPatternVariance = patternVariance / (totalPixels * 3 / 4);
    
    console.log("Color analysis:", {
      whitePercent, 
      bluePercent, 
      redPercent, 
      brightPercent, 
      darkPercent,
      normalizedPatternVariance
    });
    
    // Enhanced logic for detection with increased thresholds
    if (bluePercent > 0.3) {
      console.log("Fallback detection: denim/jeans (high blue content)");
      return "denim";
    } else if (redPercent > 0.25) {
      console.log("Fallback detection: saree or traditional garment (high red content)");
      return "saree";
    } else if (normalizedPatternVariance > 50) {
      console.log("Fallback detection: traditional patterned garment");
      return "kurta";
    } else if (whitePercent > 0.45 || brightPercent > 0.65) {
      console.log("Fallback detection: t-shirt (high brightness)");
      return "tshirt";
    } else if (darkPercent > 0.55) {
      console.log("Fallback detection: formal shirt or dark denim");
      return "shirt";
    }
    
    // Enhanced weight-based decision with adjusted thresholds
    const weights = {
      tshirt: (whitePercent * 0.7 + brightPercent * 0.5) * 1.3,
      denim: bluePercent * 0.9 * 1.7,
      shirt: darkPercent * 0.6 * 1.3,
      saree: redPercent * 0.8 + normalizedPatternVariance * 0.012 * 1.6,
      kurta: normalizedPatternVariance * 0.025 + greenCount/(totalPixels/4) * 0.6 * 1.3,
      dress: brightPercent * 0.3 + (normalizedPatternVariance < 20 ? 0.3 : 0),
      lehenga: redPercent * 0.5 + normalizedPatternVariance * 0.015 * 1.4
    };
    
    // Find the highest weight
    let highestWeight = 0;
    let bestType = "tshirt";
    
    for (const [type, weight] of Object.entries(weights)) {
      if (weight > highestWeight) {
        highestWeight = weight;
        bestType = type;
      }
    }
    
    console.log("Fallback detection weights:", weights);
    console.log(`Fallback detection choosing: ${bestType}`);
    return bestType;
    
  } catch (error) {
    console.error("Error in fallback detection:", error);
    return "tshirt";
  }
};

// Function to analyze the condition of the garment using basic image analysis
export const analyzeGarmentCondition = async (garmentType: string, imageDataUrl: string): Promise<string> => {
  // Base conditions to return if no advanced analysis is possible
  const conditions = [
    "Good condition with minor wear. The material is suitable for upcycling projects requiring medium-sized fabric pieces.",
    "Excellent condition with minimal signs of wear. Perfect for upcycling projects that need intact fabric.",
    "Fair condition with some visible wear. Best suited for small upcycling projects or patchwork.",
    "Good condition with some fading. The fabric remains durable and suitable for most upcycling ideas."
  ];
  
  try {
    // Create a temporary canvas to analyze the image 
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    // Create a promise to handle the async image load
    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        resolve();
      };
      img.src = imageDataUrl;
      img.onerror = (err) => reject(err);
    });
    
    // Get image data for analysis
    const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData?.data;
    
    if (data) {
      // Analyze image for color consistency, which can indicate condition
      let colorVariance = 0;
      let totalPixels = canvas.width * canvas.height;
      let prevPixel = [0, 0, 0];
      
      // Sample pixels to speed up analysis
      for (let i = 0; i < data.length; i += 16) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        if (i > 0) {
          colorVariance += Math.abs(r - prevPixel[0]) + Math.abs(g - prevPixel[1]) + Math.abs(b - prevPixel[2]);
        }
        
        prevPixel = [r, g, b];
      }
      
      // Normalize variance
      const normalizedVariance = colorVariance / (totalPixels * 0.25 * 3); // Adjusted for sampling rate
      
      // Higher variance often indicates patterns or wear
      if (normalizedVariance > 80) {
        return "Fair condition with noticeable wear or patterns. Best suited for small upcycling projects or creative patchwork.";
      } else if (normalizedVariance > 40) {
        return "Good condition with some visible patterns or minor wear. Suitable for medium-sized upcycling projects.";
      } else {
        return "Excellent condition with consistent color. Perfect for upcycling projects requiring large pieces of intact fabric.";
      }
    }
  } catch (error) {
    console.error("Error in condition analysis:", error);
  }
  
  // Return a consistent condition for each garment type if analysis fails
  const hashCode = garmentType.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const index = Math.abs(hashCode) % conditions.length;
  return conditions[index];
};
