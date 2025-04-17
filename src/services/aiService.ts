
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = false;

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

// Initialize models lazily
let classificationModel: any = null;

// Map garment types to sustainability impact data
// Based on industry research on average savings per upcycled garment in Indian context
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
  "denim": [
    {
      id: 1,
      title: "Denim Potli Bag",
      description: "Transform your old jeans into a traditional Indian Potli bag with colorful drawstrings and mirror work for festivals and weddings.",
      difficulty: "Medium",
      timeNeeded: "3-4 hours",
      materials: ["Old jeans", "Colorful drawstring cord", "Mirror embellishments", "Needle & thread"],
      beforeImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=375&q=80",
      afterImage: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=385&q=80"
    },
    {
      id: 2,
      title: "Denim Cushion Covers",
      description: "Create stylish cushion covers with block printing or embroidery inspired by traditional Indian patterns.",
      difficulty: "Easy",
      timeNeeded: "2 hours",
      materials: ["Old jeans", "Scissors", "Needle & thread", "Block printing materials (optional)"],
      beforeImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=375&q=80",
      afterImage: "https://images.unsplash.com/photo-1633789242441-8a7916d43c0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      id: 3,
      title: "Kolhapuri-Style Denim Sandals",
      description: "Upcycle your jeans into uniquely Indian Kolhapuri-inspired sandals with leather accents.",
      difficulty: "Hard",
      timeNeeded: "5-6 hours",
      materials: ["Old jeans", "Leather pieces", "Rubber sole", "Strong adhesive", "Decorative beads"],
      beforeImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=375&q=80",
      afterImage: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    }
  ],
  "tshirt": [
    {
      id: 4,
      title: "T-shirt Tote with Bandhani",
      description: "Transform your old t-shirt into a reusable tote with traditional Bandhani tie-dye patterns for an eco-friendly shopping bag.",
      difficulty: "Easy",
      timeNeeded: "1-2 hours",
      materials: ["Old t-shirt", "Scissors", "Fabric dye", "String for tie-dye"],
      beforeImage: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      afterImage: "https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=404&q=80"
    },
    {
      id: 5,
      title: "Kalamkari Embellished Crop Top",
      description: "Convert your t-shirt into a trendy crop top with hand-painted Kalamkari-inspired designs or fabric patches.",
      difficulty: "Medium",
      timeNeeded: "3 hours",
      materials: ["Old t-shirt", "Fabric paint/Kalamkari patches", "Scissors", "Thread & needle"],
      beforeImage: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      afterImage: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    }
  ],
  "dress": [
    {
      id: 6,
      title: "Kurtis from Western Dress",
      description: "Transform your western dress into one or more stylish kurtis with Indian embellishments and detailing.",
      difficulty: "Medium",
      timeNeeded: "4 hours",
      materials: ["Old dress", "Decorative lace", "Thread & needle", "Fabric scissors"],
      beforeImage: "https://images.unsplash.com/photo-1558471461-f077415d6dcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      afterImage: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    }
  ],
  "shirt": [
    {
      id: 7,
      title: "Modi Jacket from Old Shirt",
      description: "Convert your formal shirt into a stylish Modi/Nehru jacket by altering the collar and adding traditional closures.",
      difficulty: "Hard",
      timeNeeded: "5 hours",
      materials: ["Old shirt", "Extra fabric for lining", "Thread & needle", "Traditional buttons"],
      beforeImage: "https://images.unsplash.com/photo-1558471461-f077415d6dcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      afterImage: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
    }
  ],
  "saree": [
    {
      id: 8,
      title: "Saree Tote Bags",
      description: "Convert old silk sarees into beautiful, durable tote bags with minimal stitching.",
      difficulty: "Easy",
      timeNeeded: "2 hours",
      materials: ["Old saree", "Scissors", "Sewing machine", "Lining fabric"],
      beforeImage: "https://images.unsplash.com/photo-1610189351945-f7a262702eda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      afterImage: "https://images.unsplash.com/photo-1605518200282-7aaa6199e3b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      id: 9,
      title: "Saree Kurta Set",
      description: "Transform an old saree into a modern kurta-palazzo set perfect for festivals or casual outings.",
      difficulty: "Hard",
      timeNeeded: "8 hours",
      materials: ["Old saree", "Scissors", "Sewing machine", "Thread", "Lining fabric"],
      beforeImage: "https://images.unsplash.com/photo-1610189351945-f7a262702eda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      afterImage: "https://images.unsplash.com/photo-1580465446361-8aaa7f5ec0b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    }
  ],
  "kurta": [
    {
      id: 10,
      title: "Upcycled Kurta Pillows",
      description: "Turn an old kurta with beautiful embroidery into decorative pillows for your home.",
      difficulty: "Easy",
      timeNeeded: "1-2 hours",
      materials: ["Old kurta", "Scissors", "Needle & thread", "Pillow stuffing"],
      beforeImage: "https://images.unsplash.com/photo-1606791100018-3fb86efd72e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      afterImage: "https://images.unsplash.com/photo-1633789242441-8a7916d43c0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    }
  ],
  "default": [
    {
      id: 11,
      title: "Fabric Jewelry with Indian Elements",
      description: "Create necklaces, bracelets or earrings using fabric scraps and traditional beads or mirror work.",
      difficulty: "Easy",
      timeNeeded: "1 hour",
      materials: ["Fabric scraps", "Beads", "Thread", "Jewelry findings"],
      beforeImage: "https://images.unsplash.com/photo-1558471461-f077415d6dcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      afterImage: "https://images.unsplash.com/photo-1619463071014-e6559951eacc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
    }
  ]
};

// Function to get material composition based on garment type
const getMockMaterialComposition = (garmentType: string): { type: string; percentage: number }[] => {
  switch (garmentType.toLowerCase()) {
    case "denim":
    case "jeans":
      return [
        { type: "Cotton", percentage: 85 },
        { type: "Polyester", percentage: 13 },
        { type: "Elastane", percentage: 2 }
      ];
    case "tshirt":
      return [
        { type: "Cotton", percentage: 95 },
        { type: "Elastane", percentage: 5 }
      ];
    case "dress":
      return [
        { type: "Cotton", percentage: 60 },
        { type: "Polyester", percentage: 40 }
      ];
    case "shirt":
      return [
        { type: "Cotton", percentage: 70 },
        { type: "Polyester", percentage: 30 }
      ];
    case "saree":
      return [
        { type: "Silk", percentage: 85 },
        { type: "Zari", percentage: 15 }
      ];
    case "kurta":
      return [
        { type: "Cotton", percentage: 90 },
        { type: "Viscose", percentage: 10 }
      ];
    case "lehenga":
      return [
        { type: "Silk", percentage: 60 },
        { type: "Polyester", percentage: 25 },
        { type: "Metallic thread", percentage: 15 }
      ];
    default:
      return [
        { type: "Cotton", percentage: 75 },
        { type: "Synthetic", percentage: 25 }
      ];
  }
};

// Function to initialize models
const initModels = async () => {
  try {
    // Use a more suitable model for garment classification
    console.log("Initializing alternative garment model...");
    
    // We're simulating the use of garment_model.h5 by using a different approach
    // For browser compatibility, we'll use a pre-trained model from Hugging Face
    classificationModel = await pipeline(
      "image-classification", 
      "Xenova/vit-base-patch16-224", // Alternative model that works in browser
      { device: 'cpu' } // Use 'webgpu' for better performance if available
    ).catch(error => {
      console.log("Error loading image classification model:", error);
      return null;
    });
    
    return true;
  } catch (error) {
    console.error("Error initializing AI models:", error);
    return false;
  }
};

// Function to analyze garment from image
export const analyzeGarment = async (imageDataUrl: string): Promise<GarmentAnalysis> => {
  try {
    // Initialize models if not already done
    await initModels();
    
    // Using a fallback approach to simulate garment_model.h5
    // We'll extract features from the image and classify them
    let garmentType = "denim"; // Default type
    
    try {
      if (classificationModel) {
        const result = await classificationModel(imageDataUrl);
        console.log("Classification result:", result);
        
        // Extract garment type from results
        // This simulates what garment_model.h5 would do
        const garmentKeywords = [
          "jeans", "denim", "tshirt", "shirt", "dress", "jacket", "pants",
          "saree", "kurta", "salwar", "lehenga", "dhoti", "dupatta"
        ];
        
        for (const item of result) {
          const loweredLabel = item.label.toLowerCase();
          for (const keyword of garmentKeywords) {
            if (loweredLabel.includes(keyword)) {
              garmentType = keyword;
              break;
            }
          }
          if (garmentType !== "denim") break; // If we found a match, stop looking
        }
      } else {
        // If model loading failed, use image analysis based on colors/patterns
        // This is a simplified fallback that simulates what garment_model.h5 might do
        console.log("Using fallback garment detection...");
        
        // Create a temporary canvas to analyze the image colors
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        // Create a promise to handle the async image load
        await new Promise<void>((resolve) => {
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            resolve();
          };
          img.src = imageDataUrl;
        });
        
        // Get color data for basic analysis
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData?.data;
        
        if (data) {
          // Simple color-based heuristic (this is just a simulation)
          let blueCount = 0;
          let redCount = 0;
          let whiteCount = 0;
          
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            if (b > r + 50 && b > g + 50) blueCount++;
            if (r > b + 50 && r > g + 50) redCount++;
            if (r > 200 && g > 200 && b > 200) whiteCount++;
          }
          
          const totalPixels = canvas.width * canvas.height;
          
          // Very simple heuristic to guess garment type
          if (blueCount > totalPixels * 0.3) garmentType = "denim";
          else if (whiteCount > totalPixels * 0.5) garmentType = "shirt";
          else if (redCount > totalPixels * 0.3) garmentType = "saree";
        }
      }
    } catch (modelError) {
      console.error("Model error, using fallback:", modelError);
      // Continue with the default garment type
    }
    
    // Get material composition based on garment type
    const materials = getMockMaterialComposition(garmentType);
    
    // Generate sustainability impact data
    const impactData = sustainabilityData[garmentType] || sustainabilityData.default;
    
    // Assess condition (would use the segmentation model in a real app)
    const condition = "Good condition with minor wear. The material is suitable for upcycling projects requiring medium-sized fabric pieces.";
    
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
    
    // Return fallback data
    return {
      garmentType: "Unknown",
      condition: "Unable to assess condition",
      materialComposition: [{ type: "Unknown", percentage: 100 }],
      sustainabilityImpact: {
        waterSaved: sustainabilityData.default.water,
        co2Reduced: sustainabilityData.default.co2,
        wasteDiverted: sustainabilityData.default.waste
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
  
  // Return default ideas if no specific match
  return garmentToIdeas.default;
};
